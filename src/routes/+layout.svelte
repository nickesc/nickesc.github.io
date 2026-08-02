<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

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
	<main id="content">
		{@render children()}
	</main>
	<footer>
		<InputTerminal />
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		background: #111;
	}
	:global(html) {
		box-sizing: border-box;
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: inherit;
	}
</style>
