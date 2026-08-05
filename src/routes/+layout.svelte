<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';

	import favicon from '$lib/assets/favicon.svg';

	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/700.css';

	import TabBar from '$lib/components/TabBar.svelte';
	import InputTerminal from '$lib/components/InputTerminal.svelte';

	let { children } = $props();

	let dragging = $state(false);
	let initialY = $state(0);
	let mainHeight = $state(80);
	let footerHeight = $derived(100 - mainHeight);
	let windowElement: HTMLElement | undefined = $state();

	let on = $state(true);
	let maximized = $state(false);

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
		--brand-black: #111;
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
	}
	:global(html) {
		box-sizing: border-box;
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
		height: calc(100vh - 2rem);
		width: calc(100vw - 2rem);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		margin: 1rem;
		border: 1px solid var(--brand-grey);
		border-radius: var(--window-corners);
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(10px);
		background: rgba(from var(--brand-dark) r g b / 0.9);
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
