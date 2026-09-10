<script lang="ts">
	import { onMount } from 'svelte';
	import type { SpotifyResponse } from '$lib/spotifyResponse';
	import SpotifyIcon from '$lib/components/icons/spotify.svelte';

	let current = $state<SpotifyResponse | null>(null);
	let name = $state<string | undefined>(undefined);
	let titleWidth = $state(0);
	let containerWidth = $state(0);
	const overflow = $derived(Math.max(0, titleWidth - containerWidth));

	function capitalize(str: string | undefined) {
		if (!str) return str;
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function msToMinSec(time: number) {
		const minutes = Math.floor(time / 60000);
		const seconds = Math.floor((time % 60000) / 1000);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	onMount(() => {
		async function pollApi() {
			const res = await fetch('https://mgic.batcomputer.xyz/current');
			const next = (await res.json()) as SpotifyResponse;
			current = next;
			name = next.track?.name;
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
	<div class="spotify-widget">
		<p>
			{#if current?.track?.context}
				<a class="secondary-link" href={current.track.context?.url ?? '#'} target="_blank">
					{current.track.context?.name} ⋅ {capitalize(current.track.context?.type)}
				</a>
			{:else}
				<span>&nbsp;</span>
			{/if}
		</p>

		<div class="track-cover-container">
			<img
				src={current?.track?.image ?? 'https://mgic.batcomputer.xyz/missingAlbum.svg'}
				alt={current?.track?.name ?? 'No track available'}
			/>
			{#if current?.track?.explicit}
				<span class="explicit">E</span>
			{/if}
		</div>
		<div class="track-name-container" bind:clientWidth={containerWidth}>
			<h2
				class="track-name"
				class:is-scrolling={overflow > 0}
				bind:clientWidth={titleWidth}
				style:--overflow={overflow}
			>
				{#if current?.track?.url}
					<a href={current.track.url} target="_blank">
						{name}
					</a>
				{:else}
					{name ?? 'No track'}
				{/if}
			</h2>
		</div>

		<p class="track-artists">
			{#if current?.track?.artists.url}
				<a class="secondary-link" href={current.track.artists.url} target="_blank">
					{current.track.artists.names.join(', ')}
				</a>
			{:else}
				{current?.track?.artists.names.join(', ') ?? '---'}
			{/if}
		</p>

		<div class="progress">
			<div class="progress-bar">
				{#if current?.player && current?.track}
					<span
						class="current-progress"
						style="width: {(current.player.progress / current.track.duration) * 100}%"
					></span>
				{/if}
			</div>
			<div class="progress-time">
				<span class="progress-time-current"
					>{current?.player?.progress ? msToMinSec(current.player.progress) : '-:--'}</span
				>
				<span class="progress-time-duration"
					>{current?.track?.duration ? msToMinSec(current.track.duration) : '-:--'}</span
				>
			</div>
		</div>
	</div>
	<a
		class="spotify-button"
		class:disabled={!current?.track?.url}
		href={current?.track?.url ?? ''}
		target="_blank"
	>
		<span class="spotify-icon"><SpotifyIcon size={28} color="var(--spotify-green)" /></span>
		{current?.track?.url ? 'Play on Spotify' : 'Not available'}
	</a>
</div>

<style>
	:root {
		--spotify-art-corners: 4px;
		--spotify-green: rgb(30, 215, 96);

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

	.spotify-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
		padding: 15px 20px;
		border-radius: var(--corners);
		background: rgba(from var(--spotify-green) r g b / 0.3);
		color: rgba(from var(--spotify-green) r g b / 1);
		border: 1px solid transparent;
		font-size: 1.1rem;
		font-family: var(--mono-font);
		text-decoration: none;
		transition: background 0.2s ease-in-out;

		.spotify-icon {
			display: flex;
			align-items: center;
			justify-content: center;
			transition: opacity 0.2s ease-in-out;
			opacity: 0.9;
		}

		&:hover {
			background: rgba(from var(--spotify-green) r g b / 0.5);
		}

		&:active {
			background: rgba(from var(--spotify-green) r g b / 0.6);
		}

		&.disabled {
			color: rgba(from var(--brand-grey) r g b / 0.5);
			background: rgba(from var(--brand-black) r g b / 0.5);
			cursor: not-allowed;
			.spotify-icon {
				opacity: 0.5;
			}
		}
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
		gap: 20px;
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
			transition:
				color 0.1s ease-in-out,
				background 0.1s ease-in-out;
			border-radius: var(--corners);
			padding: 2px 6px;

			&:hover {
				color: rgba(from var(--brand-grey) r g b / 0.9);
				background: rgba(from var(--brand-grey) r g b / 0.2);
			}

			&:active {
				color: rgba(from var(--brand-grey) r g b / 0.5);
				background: rgba(from var(--brand-grey) r g b / 0.1);
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

	.track-artists {
		width: 100%;
	}

	.track-name-container {
		--hold: 4;
		--speed: 15;

		width: 100%;
		overflow: hidden;

		h2 {
			width: max-content;
			white-space: nowrap;

			&.is-scrolling {
				--scroll: calc(var(--overflow) / var(--speed));
				--total: calc(var(--hold) * 2 + var(--scroll));

				animation: scroll-overflow calc(var(--total) * 1s)
					linear(
						0,
						0 calc(var(--hold) / var(--total) * 100%),
						1 calc((var(--hold) + var(--scroll)) / var(--total) * 100%),
						1
					)
					infinite;
			}

			a {
				text-wrap: nowrap;
				white-space: nowrap;
				text-decoration: none;
				color: rgba(from var(--brand-white) r g b / 0.9);
				font-size: 1.5rem;
				font-weight: 600;
				transition: color 0.2s ease-in-out;

				&:hover {
					color: rgba(from var(--brand-white) r g b / 0.7);
				}

				&:active {
					color: rgba(from var(--brand-white) r g b / 0.5);
				}
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track-name-container h2.is-scrolling {
			animation: none;
		}
	}

	.progress {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;

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
	}

	.progress-time {
		display: flex;
		justify-content: space-between;
		font-size: 0.8rem;
		color: rgba(from var(--brand-grey) r g b / 0.7);
	}

	@keyframes scroll-overflow {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(calc(var(--overflow) * -1px));
		}
	}
</style>
