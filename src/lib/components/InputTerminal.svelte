<script lang="ts">
	import { onMount } from 'svelte';
	import { Terminal, Command } from 'input-terminal';
	import { SvelteOutputAdapter } from 'input-terminal/svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import '@fontsource/unifontex';

	import { tabTree } from '$lib/tabs';
	import {
		dirToPathString,
		findDirectoryByPage,
		resolveDirectory,
		type Directory
	} from '$lib/filetree';
	import { backgrounds, type Background } from '$lib/themes';

	let {
		onThemeChange
	}: {
		onThemeChange?: (id?: Background) => Background | false;
	} = $props();

	let input: HTMLInputElement;
	let outputElement: HTMLElement;
	const output = new SvelteOutputAdapter();
	let terminal: Terminal;

	let hostname = $state(page.url.hostname);
	let user = $state('visitor');

	let currentDirectory: Directory = $state(tabTree);
	let path = $derived(dirToPathString(currentDirectory));

	const theme = new Command('theme', (args, options, terminal) => {
		if (args[0] === 'list') {
			terminal.stdout(backgrounds.join('\n'));
			return { themes: backgrounds };
		}

		const changed = onThemeChange?.(args[0] as Background);
		if (changed) {
			terminal.stdout(args[0] ? `Theme changed to ${args[0]}` : `Theme cycled to ${changed}`);
		} else {
			terminal.stderr(`Theme ${args[0]} not found`);
		}
		return { theme: args[0] };
	});

	theme.manual = `theme [list | &lt;name&gt;]

Change the page theme to a named theme. With no arguments, advances to the next theme. Print available themes with \`theme list\`.

Themes: ${backgrounds.join(', ')}

Examples:
  theme           # cycle to the next theme
  theme list      # list available themes
  theme ${backgrounds[0]}     # switch to the ${backgrounds[0]} theme
`;

	const ls = new Command('ls', (args, options, terminal) => {
		if (currentDirectory.parent !== null) {
			terminal.stdout('..');
		}
		terminal.stdout(currentDirectory.children.map((child) => `${child.name}/`).join('\n'));
		terminal.stdout(currentDirectory.files.map((file) => file.name).join('\n'));
		return { directory: currentDirectory };
	});

	const cd = new Command('cd', (args, options, terminal) => {
		const gotoOpts = { replaceState: true, noScroll: true, keepFocus: true };
		const targetPath = String(args[0] ?? '~');
		const directory = resolveDirectory(targetPath, currentDirectory);

		if (!directory) {
			terminal.stderr(`Directory ${targetPath} not found`);
			return { directory: currentDirectory };
		}

		if (directory === currentDirectory) {
			terminal.stderr(`Already at ${dirToPathString(directory)}`);
			return { directory };
		}

		currentDirectory = directory;
		if (directory.page) {
			goto(directory.page, gotoOpts);
		}
		return { directory };
	});

	onMount(() => {
		terminal = new Terminal({
			input,
			output,
			options: { preprompt: `${user}@${hostname}:${path}`, prompt: ' > ' },
			commands: [ls, cd, theme]
		});
		terminal.init();

		return () => terminal.destroy();
	});

	$effect(() => {
		const pageDirectory = findDirectoryByPage(page.url.pathname, tabTree);
		if (pageDirectory) {
			currentDirectory = pageDirectory;
		}
	});

	$effect(() => {
		if (terminal) {
			terminal.updateOptions({ preprompt: `${user}@${hostname}:${path}`, prompt: ' > ' });
		}
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

	<input
		bind:this={input}
		aria-label="Terminal input"
		autocomplete="off"
		autocorrect="off"
		autocapitalize="off"
		spellcheck="false"
	/>
</div>

<style>
	.input-terminal {
		padding: 1rem;
		box-sizing: border-box;
		font: 1rem/1.5 monospace;
		color: var(--brand-grey);
		font-family: 'UnifontEx', monospace;
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
		background: rgba(from var(--brand-black) r g b / 0.5);
		backdrop-filter: blur(10px);
		border-radius: var(--window-corners);
		margin: 1rem;
		margin-top: 0;
		border: 1px solid rgba(from var(--brand-dark) r g b / 0.7);
		border-right: 1px solid rgba(from var(--brand-dark) r g b / 0.5);
		border-bottom: 1px solid rgba(from var(--brand-dark) r g b / 0.5);
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
