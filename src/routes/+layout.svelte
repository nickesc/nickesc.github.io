<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';

	import favicon from '$lib/assets/favicon.svg';

	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/500.css';
	import '@fontsource/ibm-plex-mono/600.css';
	import '@fontsource/ibm-plex-mono/700.css';
	import '@fontsource/ibm-plex-sans/400.css';
	import '@fontsource/ibm-plex-sans/700.css';
	import '@fontsource/unifontex';

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
	const MAIN_PANEL_FADE_MS = 200;

	let currentBg = $state<Background>(backgrounds[0]);
	let incomingBg = $state<Background | null>(null);
	let selectedBg = $derived(incomingBg ?? currentBg);
	let overlayOn = $state(false);

	export function setBackground(id?: string): Background | false {
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

		return nextBg ?? false;
	}

	function handlePointerDown(event: PointerEvent) {
		event.preventDefault();
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		initialY = event.clientY;
		dragging = true;
	}

	function handlePointerMove(event: PointerEvent) {
		if (!dragging || !windowElement) return;

		const deltaPx = event.clientY - initialY;
		const deltaPct = (deltaPx / windowElement.clientHeight) * 100;
		mainHeight = Math.min(91, Math.max(9, mainHeight + deltaPct));
		initialY = event.clientY;
	}

	function handlePointerUp() {
		dragging = false;
	}
</script>

<svelte:window
	onpointermove={dragging ? handlePointerMove : undefined}
	onpointerup={dragging ? handlePointerUp : undefined}
	onpointercancel={dragging ? handlePointerUp : undefined}
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
	style:max-height={maximized ? 'calc(100dvh - 2rem)' : `965px`}
	style:max-width={maximized ? 'calc(100vw - 2rem)' : `1200px`}
>
	<TabBar bind:on bind:maximized fadeDuration={MAIN_PANEL_FADE_MS} />
	<main class="scrollable" style:flex={`${mainHeight} 1 0`}>
		{#key page.url.pathname}
			{#if on}
				<div
					in:fade|global={{ duration: MAIN_PANEL_FADE_MS, delay: MAIN_PANEL_FADE_MS }}
					out:fade|global={{ duration: MAIN_PANEL_FADE_MS }}
				>
					{@render children()}
				</div>
			{:else}
				<div
					in:fade|global={{ duration: MAIN_PANEL_FADE_MS, delay: MAIN_PANEL_FADE_MS }}
					out:fade|global={{ duration: MAIN_PANEL_FADE_MS }}
					class="powered-off-container"
				>
					<span>Powered off...</span>
				</div>
			{/if}
		{/key}
	</main>
	<div class="divider">
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="horizontal handle"
			class:dragging
			onpointerdown={handlePointerDown}
			role="separator"
			aria-orientation="horizontal"
			aria-valuenow={mainHeight}
		></div>
	</div>
	<footer style:flex={`${footerHeight} 1 0`}>
		<InputTerminal bind:on onThemeChange={setBackground} />
	</footer>
</div>

<style>
	:global(:root) {
		--brand-black: #0e0e0f;
		--brand-dark: #232326;
		--brand-accent: #ef5252;
		--brand-grey: #d6d6d6;
		--brand-white: #fff9f2;

		--form-accent-color: rgb(64, 99, 203);

		--corners: 2px;
		--window-corners: 5px;

		--mono-font: 'IBM Plex Mono', monospace;
		--sans-font: 'IBM Plex Sans', sans-serif;
		--terminal-font: 'UnifontEx', monospace;
	}

	:global(body) {
		margin: 0;
		font-family: var(--mono-font);
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100dvh;
		background-color: #0c0c10;
		color: var(--brand-white);
		overflow: hidden;
		overscroll-behavior: none;
	}

	:global(html) {
		box-sizing: border-box;
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: inherit;
	}

	:global(p, li) {
		font-family: var(--sans-font);
	}

	:global(h1, h2, h3, h4, h5, h6, a) {
		font-family: var(--mono-font);
	}

	:global(.scrollable) {
		scrollbar-gutter: stable;
		scrollbar-color: rgba(from var(--brand-grey) r g b / 0.9) transparent;
		scrollbar-width: thin;
	}

	@supports selector(::-webkit-scrollbar) {
		:global(.scrollable) {
			scrollbar-width: auto;
			scrollbar-color: auto;
		}
		:global(.scrollable::-webkit-scrollbar) {
			width: 8px;
			height: 8px;
		}

		:global(.scrollable::-webkit-scrollbar-track) {
			background: transparent;
		}

		:global(.scrollable::-webkit-scrollbar-thumb) {
			background: rgba(from var(--brand-grey) r g b / 0.8);
			border-radius: 4px;
		}

		:global(.scrollable::-webkit-scrollbar-thumb:hover) {
			transition: background-color 0.2s ease;
			background: rgba(from var(--brand-grey) r g b / 1);
		}
	}

	:global(select) {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: rgba(from var(--brand-grey) r g b / 0.8);
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath fill='%23232326' d='M1.4 1.4L6 6l4.6-4.6L12 2.8 6 8.8 0 2.8z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.55rem center;
		background-size: 0.7rem 0.45rem;
		color: var(--brand-dark);
		font-family: var(--mono-font);
		font-size: 1rem;
		padding: 0.25rem 1.75rem 0.25rem 0.5rem;
		border-radius: var(--corners);
		border: 2px solid transparent;
		transition: background-color 0.2s ease-in-out;
		cursor: pointer;

		&:hover {
			background-color: rgba(from var(--brand-grey) r g b / 0.9);
		}

		&:active {
			background-color: rgba(from var(--brand-grey) r g b / 0.7);
		}
	}

	@supports (appearance: base-select) {
		:global(select),
		:global(::picker(select)) {
			appearance: base-select;
		}

		:global(select:open) {
			background-color: rgba(from var(--brand-grey) r g b / 0.9);

			&::picker-icon {
				rotate: 180deg;
			}
		}

		:global(select) {
			display: flex-inline;
			align-items: center;
			background-image: none;
			padding-inline-end: 0.5rem;
		}

		:global(select::picker-icon) {
			content: '';
			width: 0.7rem;
			height: 0.45rem;
			margin-inline-start: auto;
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath fill='%23232326' d='M1.4 1.4L6 6l4.6-4.6L12 2.8 6 8.8 0 2.8z'/%3E%3C/svg%3E");
			background-repeat: no-repeat;
			background-size: contain;
			opacity: 1;
			transition: 0.2s rotate;
		}

		:global(::picker(select)) {
			background-color: rgba(from var(--brand-grey) r g b / 0.9);
			color: var(--brand-dark);
			font-family: var(--mono-font);
			font-size: 1rem;
			border-radius: var(--corners);
			backdrop-filter: blur(10px);
			border: none;
		}

		:global(option:hover) {
			background-color: var(--brand-grey);
			font-weight: bold;
			cursor: pointer;
		}

		:global(option:checked) {
			font-weight: bold;
			display: flex;
			align-items: center;
		}

		:global(option::checkmark) {
			content: '❚';
			transform: translateY(-0.1em);
		}

		@supports (transition-behavior: allow-discrete) {
			:global(::picker(select)) {
				opacity: 0;
				transition: all 0.2s allow-discrete;
			}

			:global(:open::picker(select)) {
				opacity: 1;
			}

			@starting-style {
				:global(:open::picker(select)) {
					opacity: 0;
				}
			}
		}
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

		.site-bg {
			position: absolute;
			inset: 0;
			background-attachment: fixed;

			&[data-bg='chalk-slate'] {
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

			&:is([data-bg='radar'], [data-bg='lidar'], [data-bg='sonar']) {
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

			&[data-bg='radar'] {
				--bg-color: #0f1614;
				--bg-dot-color: rgba(120, 220, 190, 0.55);
				--bg-orbs: radial-gradient(
					ellipse 70% 60% at 35% 40%,
					rgba(40, 90, 80, 0.5),
					transparent 70%
				);
				--bg-gradient: linear-gradient(165deg, #14201c 0%, #0f1614 60%, #0b100f 100%);
			}

			&[data-bg='lidar'] {
				--bg-color: #1a1410;
				--bg-dot-color: rgba(230, 160, 90, 0.35);
				--bg-orbs:
					radial-gradient(ellipse 75% 60% at 30% 30%, rgba(200, 120, 60, 0.4), transparent 65%),
					radial-gradient(ellipse 65% 55% at 80% 75%, rgba(120, 70, 40, 0.45), transparent 60%);
				--bg-gradient: linear-gradient(150deg, #2a1c14 0%, #1a1410 55%, #241812 100%);
			}

			&[data-bg='sonar'] {
				--bg-color: #081116;
				--bg-dot-color: rgba(95, 175, 200, 0.4);
				--bg-orbs:
					radial-gradient(ellipse 45% 40% at 62% 42%, rgba(70, 155, 185, 0.22), transparent 65%),
					radial-gradient(ellipse 70% 60% at 62% 42%, rgba(45, 95, 125, 0.25), transparent 70%);
				--bg-gradient: linear-gradient(165deg, #0e1a20 0%, #081116 60%, #05090d 100%);
			}
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
	}

	#terminal-window {
		position: relative;
		z-index: 1;
		height: calc(100vh - 2rem);
		height: calc(100dvh - 2rem);
		width: calc(100vw - 2rem);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		margin: 1rem;
		border: 1px solid rgba(from var(--brand-grey) r g b / 0.2);
		border-right: 1px solid rgba(from var(--brand-grey) r g b / 0.1);
		border-bottom: 1px solid rgba(from var(--brand-grey) r g b / 0.1);
		border-radius: var(--window-corners);
		box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.5);
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
		padding: 0 1rem;
		min-height: 0;
		overflow-y: scroll;
	}

	.powered-off-container {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		font-size: 2rem;
		font-weight: 600;
		color: rgba(from var(--brand-grey) r g b / 0.3);
	}

	.divider {
		user-select: none;
		flex-shrink: 0;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.3s ease;
		margin: 0;

		.handle {
			position: relative;
			user-select: none;
			touch-action: none;
			display: block;
			opacity: 0.5;
			transition: opacity 0.2s ease;

			&::before {
				content: '';
				position: absolute;
				top: 50%;
				left: 0;
				right: 0;
				height: 4px;
				transform: translateY(-50%);
				background-color: var(--brand-grey);
				border-radius: 100px;
			}

			&.horizontal {
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
