<script lang="ts">
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { games } from '$lib/games';
	import MaximizeSymbol from '$lib/components/MaximizeSymbol.svelte';

	import type { Directory, File } from '$lib/filetree';
	import { createFile, resolveDirectory } from '$lib/filetree';
	import { tabTree } from '$lib/tabs.svelte';

	const game = $derived(
		browser
			? games.find(
					(game) => game.id.toLowerCase() === page.url.searchParams.get('id')?.toLowerCase()
				)
			: undefined
	);
	const gameUrl = $derived(game?.url ?? '');
	const gameAspectRatio = $derived(game?.aspectRatio ?? 16 / 9);
	const requestedGameId = $derived(browser ? page.url.searchParams.get('id') : null);
	let loading = $state(true);
	let gameFrame: HTMLDivElement | undefined = $state(undefined);
	let isFullscreen = $state(false);

	function createGameFiles(directory: Directory): File[] {
		return games.map((game) =>
			createFile(game.id, directory, {
				href: `/games?id=${encodeURIComponent(game.id)}`
			})
		);
	}

	onMount(() => {
		const directory = resolveDirectory('/games', tabTree);
		if (directory) {
			directory.files = createGameFiles(directory);
		}
	});

	function fullscreenChangeListener() {
		if (document.fullscreenElement) {
			isFullscreen = true;
		} else {
			isFullscreen = false;
			document.removeEventListener('fullscreenchange', fullscreenChangeListener);
		}
	}

	function fullscreen() {
		if (!game) return;
		let success = true;
		if (gameFrame) {
			if (isFullscreen) {
				document.exitFullscreen();
			} else {
				try {
					gameFrame.requestFullscreen();
					document.addEventListener('fullscreenchange', fullscreenChangeListener);
				} catch (error) {
					console.error(error);
					success = false;
					window.location.href = game.fallbackUrl;
				}
			}
			isFullscreen = success ? !isFullscreen : isFullscreen;
		}
	}

	const title = $derived(game?.id ?? (requestedGameId ? 'Game not found' : 'Games'));
	const description = $derived(game?.description ?? 'Play browser games made by Nick Escobar.');
</script>

<svelte:head>
	<title>{title} | Nick Escobar</title>
	<meta name="description" content={description} />

	<meta property="og:title" content="{title} | Nick Escobar" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{title} | Nick Escobar" />
	<meta name="twitter:description" content={description} />
</svelte:head>

{#if game}
	<div
		class="game-container"
		style:--frame-width-from-height={`${gameAspectRatio * 100}cqh`}
		style:--frame-height-from-width={`${100 / gameAspectRatio}cqw`}
		style:--aspect-ratio={gameAspectRatio}
	>
		{#if game.type === 'godot'}
			<div class="game-frame" bind:this={gameFrame} aria-busy={loading}>
				{#if loading}
					<LoadingSpinner label={`Loading ${game.id}`} />
				{/if}
				<iframe
					class:loaded={!loading}
					src={gameUrl}
					title={game.id}
					allow="autoplay; fullscreen; gamepad"
					allowfullscreen
					onload={() => (loading = false)}
				></iframe>
				<button class="game-frame-fullscreen primary-button" onclick={() => fullscreen()}>
					<MaximizeSymbol maximized={isFullscreen} />
				</button>
			</div>
		{/if}
	</div>
{:else if !requestedGameId}
	<section class="game-library" aria-labelledby="games-title">
		<header class="library-header">
			<h1 id="games-title">Games</h1>
			<p class="library-intro">Games playable in the browser</p>
		</header>

		<div class="game-list">
			{#each games as listedGame (listedGame.id)}
				<article class="game-card" style:--game-color={listedGame.color}>
					<div class="game-art">
						<img src={listedGame.artUrl} alt="" width="1001" height="1000" />
					</div>
					<div class="game-info">
						<div class="game-heading">
							<h2>
								<a
									class="game-link"
									href={resolve(`/games?id=${encodeURIComponent(listedGame.id)}` as '/games')}
									data-foley-click="pop"
								>
									{listedGame.id}
								</a>
							</h2>
							<time datetime={String(listedGame.year)}>{listedGame.year}</time>
						</div>
						<p>{listedGame.description}</p>
						<span class="play-label" aria-hidden="true">Play in browser <span>→</span></span>
					</div>
				</article>
			{/each}
		</div>
	</section>
{:else}
	<section class="not-found" aria-labelledby="not-found-title">
		<p class="eyebrow">Game not found</p>
		<h1 id="not-found-title">No game named “{requestedGameId}”</h1>
		<a class="primary-button" href={resolve('/games')}>Browse games</a>
	</section>
{/if}

<style>
	.library-header {
		display: flex;
		flex-direction: row;
		align-items: end;
		gap: 0.5rem;
		justify-content: space-between;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(from var(--brand-grey) r g b / 0.22);

		h1 {
			margin: 0;
		}

		.library-intro {
			margin: 0;
			color: rgba(from var(--brand-grey) r g b / 0.6);
			line-height: 1.55;
		}

		@media (max-width: 620px) {
			flex-direction: column;
			align-items: start;
		}
	}

	.eyebrow {
		margin: 0 0 0.35rem;
		color: rgba(from var(--brand-grey) r g b / 0.65);
		font-family: var(--mono-font);
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.game-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-top: 1rem;
	}

	.game-card {
		position: relative;
		display: grid;
		grid-template-columns: 0.7fr 1.3fr;
		min-height: 260px;
		overflow: hidden;
		border: 1px solid rgba(from var(--brand-grey) r g b / 0.22);
		border-radius: var(--window-corners);
		background: rgba(from var(--brand-black) r g b / 0.6);
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease;

		&:hover,
		&:focus-within {
			border-color: rgba(from var(--game-color) r g b / 0.75);
			background: rgba(from var(--brand-black) r g b / 0.72);
		}
	}

	.game-art {
		display: grid;
		place-items: center;
		min-height: 260px;
		background-color: var(--game-color);

		img {
			display: block;
			width: min(78%, 250px);
			height: auto;
			aspect-ratio: 1;
			object-fit: contain;
			transition: transform 220ms ease;
		}
	}

	.game-info {
		display: flex;
		flex-direction: column;
		padding: 25px;

		> p {
			max-width: 38rem;
			margin: 10px 0;
			color: rgba(from var(--brand-white) r g b / 0.75);
			line-height: 1.55;
		}
	}

	.game-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;

		h2 {
			margin: 0;
			font-size: 2rem;
			letter-spacing: -0.04em;
		}

		time {
			color: rgba(from var(--brand-grey) r g b / 0.58);
			font-family: var(--mono-font);
			font-size: 0.75rem;
		}
	}

	.game-link {
		color: var(--brand-white);
		text-decoration: none;
		white-space: normal;

		&::after {
			position: absolute;
			inset: 0;
			content: '';
		}

		&:focus-visible {
			outline: none;

			&::after {
				outline: 2px solid var(--game-color);
			}
		}
	}

	.play-label {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-top: auto;
		color: var(--game-color);
		font-family: var(--mono-font);
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;

		span {
			font-size: 1.15rem;
		}
	}

	.not-found {
		display: grid;
		place-content: center;
		justify-items: start;
		min-height: 100%;

		h1 {
			margin-bottom: 2rem;
			font-size: 2rem;
			line-height: 1;
		}
	}

	.game-container {
		container-type: size;
		width: 100%;
		height: 100%;
		min-width: 0;
		min-height: 0;
		border-radius: var(--window-corners);
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.game-frame {
		position: relative;
		display: block;
		width: min(100cqw, var(--frame-width-from-height));
		height: min(100cqh, var(--frame-height-from-width));
		flex: none;
		border-radius: var(--window-corners);
		aspect-ratio: var(--aspect-ratio);
		overflow: hidden;

		button {
			position: absolute;
			top: 0;
			right: 0;
			width: 24px;
			height: 24px;
			padding: 0;
			margin: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.game-frame :global(.loading-spinner),
	iframe {
		position: absolute;
		inset: 0;
	}

	iframe {
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s ease;
	}

	iframe.loaded {
		opacity: 1;
		pointer-events: auto;
	}

	@media (max-width: 620px) {
		.game-card {
			grid-template-columns: 1fr;
		}

		.game-art {
			min-height: 210px;
		}

		.game-art img {
			width: min(55%, 190px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		iframe {
			transition: none;
		}
	}
</style>
