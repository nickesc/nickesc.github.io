<script lang="ts">
	import { onMount } from 'svelte';
	import type { SpotifyResponse } from '$lib/spotifyResponse';

	let data = $state<SpotifyResponse | null>(null);

	function capitalize(str: string | undefined) {
		if (!str) return str;
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	onMount(() => {
		async function pollApi() {
			const res = await fetch('https://mgic.batcomputer.xyz/current');
			const next = (await res.json()) as SpotifyResponse;
			data = next;
		}

		// Run immediately on mount
		pollApi();

		// Repeat consistently every 10 seconds
		const interval = setInterval(pollApi, 5000);

		// Lifecycle cleanup
		return () => clearInterval(interval);
	});
</script>

<div class="spotify-container">
	{#if data}
		<div class="spotify-widget">
			{#if data.track?.context}
				<p>
					<a class="secondary-link" href={data.track.context?.url ?? '#'} target="_blank">
						{data.track.context?.name} - {capitalize(data.track.context?.type)}
					</a>
				</p>
			{/if}

			<div class="track-cover-container">
				<img
					src={data.track?.image ?? 'https://mgic.batcomputer.xyz/missingAlbum.svg'}
					alt={data.track?.name ?? 'No track available'}
				/>
				{#if data.track?.explicit}
					<span class="explicit">E</span>
				{/if}
			</div>
			{#if data.track?.url}
				<h2 class="track-name">
					<a href={data.track.url} target="_blank">
						{data.track.name}
					</a>
				</h2>
			{:else}
				<h2 class="track-name">{data.track?.name ?? 'Not online'}</h2>
			{/if}

			{#if data.track?.artists.url}
				<p>
					<a class="secondary-link" href={data.track.artists.url} target="_blank">
						{data.track.artists.names.join(', ')}
					</a>
				</p>
			{:else}
				<p>{data.track?.artists.names.join(', ') ?? '---'}</p>
			{/if}

			<div class="progress-bar">
				{#if data.player && data.track}
					<span
						class="current-progress"
						style="width: {(data.player.progress / data.track.duration) * 100}%"
					></span>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	:root {
		--spotify-art-corners: 4px;

		@media (min-width: 769px) {
			--spotify-art-corners: 8px;
		}
	}

	a,
	p,
	h2 {
		margin: 0;
		padding: 0;
	}

	:global(.tabpanel:has(.spotify-container)) {
		height: 100%;
		width: 100%;
	}

	.spotify-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.track-cover-container {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: fit-content;
		isolation: isolate;

		.explicit {
			font-family: var(--mono-font);
			position: absolute;
			bottom: 0;
			right: 0;
			margin: 10px;
			padding: 2px 6px;
			border-radius: var(--corners);
			text-align: center;
			font-size: 0.8rem;
			font-weight: bold;
			line-height: 1.2;
			background: #fff;
			color: #000;
			mix-blend-mode: difference;
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
		}
	}

	.spotify-widget {
		font-family: var(--sans-font);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		width: 100%;
		max-width: 400px;

		a,
		h2,
		p {
			font-family: var(--sans-font);
		}

		.secondary-link {
			font-family: var(--sans-font);
			text-decoration: none;
			color: rgba(from var(--brand-grey) r g b / 0.7);
			transition: color 0.2s ease-in-out;

			&:hover {
				color: rgba(from var(--brand-grey) r g b / 0.5);
			}

			&:active {
				color: rgba(from var(--brand-grey) r g b / 0.9);
			}
		}

		h2 a {
			text-wrap: pretty;
			text-decoration: none;
			color: rgba(from var(--brand-white) r g b / 0.9);
			font-size: 1.5rem;
			font-weight: 600;
			transition: color 0.2s ease-in-out;

			&:hover {
				color: rgba(from var(--brand-white) r g b / 0.6);
			}

			&:active {
				color: rgba(from var(--brand-white) r g b / 1);
			}
		}

		img {
			display: block;
			border-radius: var(--spotify-art-corners);
			border: 1px solid var(--brand-dark);
			width: 100%;
			height: auto;
			aspect-ratio: 1;
		}
	}

	.progress-bar {
		display: block;
		width: 100%;
		height: 10px;
		background-color: rgba(from var(--brand-grey) r g b / 0.3);
		border-radius: 100px;

		.current-progress {
			display: block;
			height: 100%;
			background-color: rgba(from var(--brand-grey) r g b / 0.9);
			transition: width 0.5s ease-in-out;
			border-radius: 100px;
			min-width: 10px;
		}
	}
</style>
