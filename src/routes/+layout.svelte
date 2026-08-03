<script lang="ts">
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

<div id="terminal-window" bind:this={windowElement} class:dragging>
	<TabBar bind:on />
	<main style:flex={`${mainHeight} 1 0`}>
		{#if on}
			{@render children()}
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
	}
	:global(html) {
		box-sizing: border-box;
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: inherit;
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

		&.dragging {
			user-select: none;
			cursor: row-resize;
		}
	}

	main {
		padding: 1rem;
		min-height: 0;
		overflow-y: auto;
	}

	.divider {
		user-select: none;
		flex-shrink: 0;
		height: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.3s ease;

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
