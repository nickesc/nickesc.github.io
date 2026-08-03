<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/700.css';

	import TabBar from '$lib/components/TabBar.svelte';
	import InputTerminal from '$lib/components/InputTerminal.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="terminal-window">
	<header>
		<TabBar />
	</header>
	<main>
		{@render children()}
	</main>
	<footer>
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
		display: flex;
		flex-direction: column;
		margin: 1rem;
		border: 1px solid var(--brand-grey);
		border-radius: var(--window-corners);
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(10px);
		background: rgba(from var(--brand-dark) r g b / 0.9);
		header {
			padding: 0.5rem;
		}
		main {
			padding: 1rem;
		}
		footer {
		}
	}
</style>
