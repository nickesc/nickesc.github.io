<script lang="ts">
	import { onMount } from 'svelte';
	import { Terminal } from 'input-terminal';
	import { SvelteOutputAdapter } from 'input-terminal/svelte';

	let input: HTMLInputElement;
	let outputElement: HTMLElement;
	const output = new SvelteOutputAdapter();

	onMount(() => {
		const terminal = new Terminal({ input, output });
		terminal.init();

		return () => terminal.destroy();
	});

	$effect(() => {
		output.entries;
		if (outputElement) {
			outputElement.scrollTop = outputElement.scrollHeight;
		}
	});
</script>

<div class="input-terminal">
	<div class="output scrollable" bind:this={outputElement} aria-live="polite">
		<div class="output-entries">
			{#each output.entries as entry (entry.metadata.sequence)}
				<div class:error={entry.operation === 'stderr'}>{String(entry.data)}</div>
			{/each}
		</div>
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
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
		background: rgba(from var(--brand-dark) r g b / 0.8);
		border-radius: var(--window-corners);
		margin: 1rem;
		margin-top: 0;
	}

	.output {
		flex: 1;
		min-height: 0;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		white-space: pre-wrap;
	}

	.output-entries {
		margin-top: auto;
	}

	.error {
		color: #ff6b6b;
	}

	input {
		flex-shrink: 0;
		width: 100%;
		padding: 0;
		border: 0;
		outline: 0;
		background: transparent;
		font: inherit;
		color: inherit;
	}
</style>
