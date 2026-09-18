<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { games } from '$lib/games';
	import MaximizeSymbol from '$lib/components/MaximizeSymbol.svelte';
	import { foley } from '$lib/foley.svelte';

	type GodotWindow = Window & {
		GodotAudio?: {
			ctx?: AudioContext | null;
		};
	};

	const game = $derived(
		browser
			? games.find(
					(game) => game.id.toLowerCase() === page.url.searchParams.get('game')?.toLowerCase()
				)
			: undefined
	);
	const gameUrl = $derived(game?.url ?? '');
	const gameAspectRatio = $derived(game?.aspectRatio ?? 16 / 9);
	let loading = $state(true);
	let gameFrame: HTMLDivElement | undefined = $state(undefined);
	let gameIframe: HTMLIFrameElement | undefined = $state(undefined);
	let isFullscreen = $state(false);

	function fullscreen() {
		if (gameFrame) {
			if (isFullscreen) {
				document.exitFullscreen();
			} else {
				gameFrame.requestFullscreen();
			}
			isFullscreen = !isFullscreen;
		}
	}

	function syncGameMuted(muted: boolean) {
		try {
			const audioContext = (gameIframe?.contentWindow as GodotWindow | null)?.GodotAudio?.ctx;
			if (!audioContext) return false;

			if (muted && audioContext.state === 'running') {
				void audioContext.suspend();
			} else if (!muted && audioContext.state === 'suspended') {
				void audioContext.resume();
			}

			return true;
		} catch {
			// The game may be cross-origin in local development.
			return false;
		}
	}

	$effect(() => {
		const muted = foley.muted;
		const currentGameUrl = gameUrl;

		if (!currentGameUrl || !gameIframe || syncGameMuted(muted) || !muted) return;

		const syncTimer = setInterval(() => {
			if (syncGameMuted(muted)) clearInterval(syncTimer);
		}, 100);

		return () => clearInterval(syncTimer);
	});
</script>

<svelte:head>
	<title>{game?.id ?? 'Invalid Game'} | Nick Escobar</title>
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
					bind:this={gameIframe}
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
{/if}

<style>
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
		transition: opacity 180ms ease;
	}

	iframe.loaded {
		opacity: 1;
		pointer-events: auto;
	}

	@media (prefers-reduced-motion: reduce) {
		iframe {
			transition: none;
		}
	}
</style>
