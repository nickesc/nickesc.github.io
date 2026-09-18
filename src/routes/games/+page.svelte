<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { games } from '$lib/games';

	const game = $derived(
		browser
			? games.find(
					(game) => game.name.toLowerCase() === page.url.searchParams.get('game')?.toLowerCase()
				)
			: undefined
	);
	const gameUrl = $derived(game?.url ?? '');
	const gameAspectRatio = $derived(game?.aspectRatio ?? 16 / 9);
</script>

<svelte:head>
	<title>{game?.name ?? 'Invalid Game'} | Nick Escobar</title>
</svelte:head>

{#if game}
	<div
		class="game-container"
		style:--frame-width-from-height={`${gameAspectRatio * 100}cqh`}
		style:--frame-height-from-width={`${100 / gameAspectRatio}cqw`}
	>
		{#if game.type === 'godot'}
			<iframe
				src={gameUrl}
				title={`${game.name}`}
				allow="autoplay; fullscreen; gamepad"
				allowfullscreen
				style="aspect-ratio: {gameAspectRatio}"
			></iframe>
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
		border-radius: 8px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	iframe {
		display: block;
		width: min(100cqw, var(--frame-width-from-height));
		height: min(100cqh, var(--frame-height-from-width));
		flex: none;
		border: 0;
	}
</style>
