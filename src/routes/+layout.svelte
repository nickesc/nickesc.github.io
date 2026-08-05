<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';

	import favicon from '$lib/assets/favicon.svg';

	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/700.css';

	import TabBar from '$lib/components/TabBar.svelte';
	import InputTerminal from '$lib/components/InputTerminal.svelte';

	import { backgrounds, type Background } from '$lib/themes';

	let { children } = $props();

	let dragging = $state(false);
	let initialY = $state(0);
	let mainHeight = $state(80);
	let footerHeight = $derived(100 - mainHeight);
	let windowElement: HTMLElement | undefined = $state();

	let on = $state(true);
	let maximized = $state(false);

	const BG_FADE_MS = 700;

	let currentBg = $state<Background>(backgrounds[0]);
	let incomingBg = $state<Background | null>(null);
	let selectedBg = $derived(incomingBg ?? currentBg);
	let overlayOn = $state(false);

	export function setBackground(id?: string) {
		const nextBg =
			id === undefined
				? backgrounds[(backgrounds.indexOf(currentBg) + 1) % backgrounds.length]
				: backgrounds.find((background) => background === id);
		if (incomingBg || !nextBg || nextBg === currentBg) return false;

		incomingBg = nextBg;

		overlayOn = true;

		setTimeout(() => {
			currentBg = nextBg;
			overlayOn = false;
			incomingBg = null;
		}, BG_FADE_MS);

		return true;
	}

	function handleMouseDown(event: MouseEvent) {
		event.preventDefault();
		initialY = event.clientY;
		dragging = true;
	}

	function handleMouseMove(event: MouseEvent) {
		if (!dragging || !windowElement) return;

		const deltaPx = event.clientY - initialY;
		const deltaPct = (deltaPx / windowElement.clientHeight) * 100;
		mainHeight = Math.min(90, Math.max(10, mainHeight + deltaPct));
		initialY = event.clientY;
	}

	function handleMouseUp() {
		dragging = false;
	}
</script>

<svelte:window
	onmousemove={dragging ? handleMouseMove : undefined}
	onmouseup={dragging ? handleMouseUp : undefined}
/>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="site-bg-stack" aria-hidden="true">
	<div class="site-bg site-bg-base" data-bg={currentBg}></div>
	<div
		class="site-bg site-bg-overlay"
		class:on={overlayOn}
		class:instant={!overlayOn}
		data-bg={selectedBg}
	></div>
</div>

<div
	id="terminal-window"
	bind:this={windowElement}
	class:dragging
	style:max-height={maximized ? 'calc(100vh - 2rem)' : `950px`}
	style:max-width={maximized ? 'calc(100vw - 2rem)' : `1200px`}
>
	<TabBar bind:on bind:maximized />
	<main class="scrollable" style:flex={`${mainHeight} 1 0`}>
		{#if on}
			{#key page.url.pathname}
				<div in:fade={{ duration: 100, delay: 150 }} out:fade={{ duration: 100 }}>
					{@render children()}
				</div>
			{/key}
		{/if}
	</main>
	<div class="divider">
		<div
			class="vertical handle"
			class:dragging
			onmousedown={handleMouseDown}
			role="separator"
			aria-orientation="horizontal"
			aria-valuenow={mainHeight}
		></div>
	</div>
	<footer style:flex={`${footerHeight} 1 0`}>
		<InputTerminal />
	</footer>
</div>

<style>
	:global(:root) {
		--brand-black: #0e0e0f;
		--brand-dark: #232326;
		--brand-accent: #ef5252;
		--brand-grey: #d6d6d6;
		--brand-white: #fff9f2;

		--corners: 2px;
		--window-corners: 7px;
	}

	:global(body) {
		margin: 0;
		font-family: 'IBM Plex Mono', monospace;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #0c0c10;
		overflow: hidden;
	}

	:global(html) {
		box-sizing: border-box;
	}

	.site-bg-stack {
		--bg-dot-core: 1.6px;
		--bg-dot-edge: 2px;
		--bg-dot-grid: 44px;
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background-color: #0c0c10;
	}

	.site-bg {
		position: absolute;
		inset: 0;
		background-attachment: fixed;
	}

	.site-bg-base {
		opacity: 1;
	}

	.site-bg-overlay {
		opacity: 0;
		transition: opacity 0.7s ease;

		&.on {
			opacity: 1;
		}

		&.instant {
			transition: none;
		}
	}

	/* --- TEMP background variants --- */

	.site-bg[data-bg='chalk-slate'] {
		background-color: #b0bcc8;
		background-image:
			linear-gradient(rgba(40, 50, 60, 0.08) 1px, transparent 1px),
			linear-gradient(90deg, rgba(40, 50, 60, 0.08) 1px, transparent 1px),
			radial-gradient(ellipse 140% 28% at 50% 12%, rgba(90, 150, 210, 0.45), transparent 70%),
			radial-gradient(ellipse 160% 32% at 35% 38%, rgba(70, 130, 195, 0.38), transparent 68%),
			radial-gradient(ellipse 150% 30% at 65% 62%, rgba(100, 165, 220, 0.42), transparent 70%),
			radial-gradient(ellipse 170% 34% at 45% 88%, rgba(80, 140, 200, 0.4), transparent 72%),
			linear-gradient(180deg, #c8d4e0 0%, #b4c0cc 35%, #a8b6c4 65%, #9aabc0 100%);
		background-size:
			28px 28px,
			28px 28px,
			auto,
			auto,
			auto,
			auto,
			auto;
	}

	.site-bg:is([data-bg='radar'], [data-bg='lidar'], [data-bg='sonar']) {
		background-color: var(--bg-color);
		background-image:
			radial-gradient(
				circle,
				var(--bg-dot-color) var(--bg-dot-core),
				transparent var(--bg-dot-edge)
			),
			var(--bg-orbs), var(--bg-gradient);
		background-size:
			var(--bg-dot-grid) var(--bg-dot-grid),
			auto,
			auto,
			auto;
	}

	.site-bg[data-bg='radar'] {
		--bg-color: #0f1614;
		--bg-dot-color: rgba(120, 220, 190, 0.55);
		--bg-orbs: radial-gradient(ellipse 70% 60% at 35% 40%, rgba(40, 90, 80, 0.5), transparent 70%);
		--bg-gradient: linear-gradient(165deg, #14201c 0%, #0f1614 60%, #0b100f 100%);
	}

	.site-bg[data-bg='lidar'] {
		--bg-color: #1a1410;
		--bg-dot-color: rgba(230, 160, 90, 0.35);
		--bg-orbs:
			radial-gradient(ellipse 75% 60% at 30% 30%, rgba(200, 120, 60, 0.4), transparent 65%),
			radial-gradient(ellipse 65% 55% at 80% 75%, rgba(120, 70, 40, 0.45), transparent 60%);
		--bg-gradient: linear-gradient(150deg, #2a1c14 0%, #1a1410 55%, #241812 100%);
	}

	.site-bg[data-bg='sonar'] {
		--bg-color: #081116;
		--bg-dot-color: rgba(95, 175, 200, 0.4);
		--bg-orbs:
			radial-gradient(ellipse 45% 40% at 62% 42%, rgba(70, 155, 185, 0.22), transparent 65%),
			radial-gradient(ellipse 70% 60% at 62% 42%, rgba(45, 95, 125, 0.25), transparent 70%);
		--bg-gradient: linear-gradient(165deg, #0e1a20 0%, #081116 60%, #05090d 100%);
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: inherit;
	}

	:global(.scrollable) {
		scrollbar-gutter: stable;
		scrollbar-color: rgba(from var(--brand-grey) r g b / 0.9) transparent;
		scrollbar-width: thin;
	}

	:global(#terminal-window p, h1, h2, h3, h4, h5, h6) {
		color: var(--brand-white);
	}

	#terminal-window {
		position: relative;
		z-index: 1;
		height: calc(100vh - 2rem);
		width: calc(100vw - 2rem);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		margin: 1rem;
		border: 1px solid rgba(from var(--brand-grey) r g b / 0.2);
		border-right: 1px solid rgba(from var(--brand-grey) r g b / 0.1);
		border-bottom: 1px solid rgba(from var(--brand-grey) r g b / 0.1);
		border-radius: var(--window-corners);
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(20px);
		background: rgba(from var(--brand-black) r g b / 0.8);
		transition:
			max-height 0.3s ease-in-out,
			max-width 0.3s ease-in-out;

		&.dragging {
			user-select: none;
			cursor: row-resize;
		}
	}

	main {
		padding: 1rem;
		min-height: 0;
		overflow-y: scroll;
	}

	.divider {
		user-select: none;
		flex-shrink: 0;
		height: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.3s ease;
		margin: 0.5rem 0;

		.handle {
			user-select: none;
			display: block;
			background-color: var(--brand-grey);
			border-radius: 100px;
			opacity: 0.5;
			transition: opacity 0.2s ease;

			&.vertical {
				cursor: row-resize;
				width: 85%;
				max-width: 350px;
				height: 100%;
			}

			&:hover {
				opacity: 0.8;
			}

			&.dragging {
				opacity: 1;
			}
		}
	}

	footer {
		min-height: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
</style>
