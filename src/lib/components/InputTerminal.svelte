<script lang="ts">
	import { onMount } from 'svelte';
	import { Terminal } from 'input-terminal';
	import { SvelteOutputAdapter } from 'input-terminal/svelte';

	let input: HTMLInputElement;
	const output = new SvelteOutputAdapter();

	onMount(() => {
		const terminal = new Terminal({ input, output });
		terminal.init();

		return () => terminal.destroy();
	});
</script>

<div class="input-terminal">
	<div class="output" aria-live="polite">
		{#each output.entries as entry (entry.metadata.sequence)}
			<div class:error={entry.operation === 'stderr'}>{String(entry.data)}</div>
		{/each}
	</div>

	<input bind:this={input} aria-label="Terminal input" />
</div>

<style>
	.input-terminal {
		padding: 1rem;
		box-sizing: border-box;
		font: 1rem/1.5 monospace;
		color: var(--brand-grey);
		font-family: 'Fira Code Variable', monospace;
	}

	.output {
		white-space: pre-wrap;
	}

	.error {
		color: #ff6b6b;
	}

	input {
		width: 100%;
		padding: 0;
		border: 0;
		outline: 0;
		background: transparent;
		font: inherit;
		color: inherit;
	}
</style>
