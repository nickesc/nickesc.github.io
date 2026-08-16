<script lang="ts">
	import { onMount } from 'svelte';
	import { Terminal, Command } from 'input-terminal';
	import { SvelteOutputAdapter } from 'input-terminal/svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import { submitForm } from '$lib/submitForm';
	import { createProjectFiles } from '$lib/projects';
	import { createContactFiles } from '$lib/contact';
	import { createResumeFiles } from '$lib/resume';

	import { tabTree } from '$lib/tabs';
	import {
		dirToPathString,
		findDirectoryByPage,
		resolveDirectory,
		resolveFile,
		findChildDir,
		type Directory
	} from '$lib/filetree';
	import { backgrounds, type Background } from '$lib/themes';

	let {
		on = $bindable(),
		onThemeChange,
		placeholder = 'Type a command…'
	}: {
		on: boolean;
		onThemeChange?: (id?: Background) => Background | false;
		placeholder?: string;
	} = $props();

	let input: HTMLInputElement;
	let outputElement: HTMLElement;
	const output = new SvelteOutputAdapter();
	let terminal: Terminal;

	let hostname = $state(page.url.hostname);
	let user = $state('user');
	let terminalReady = $state(false);
	let hasUserInput = $state(false);
	let inputScrollLeft = $state(0);

	let terminalTree: Directory = $state(tabTree);

	let projectsDirectory: Directory | null = findChildDir('projects', terminalTree);
	if (projectsDirectory) {
		projectsDirectory.files = createProjectFiles(projectsDirectory);
	}

	let contactDirectory: Directory | null = findChildDir('contact', terminalTree);
	if (contactDirectory) {
		contactDirectory.files = createContactFiles(contactDirectory);
	}

	let resumeDirectory: Directory | null = findChildDir('resume', terminalTree);
	if (resumeDirectory) {
		resumeDirectory.files = createResumeFiles(resumeDirectory);
	}

	let currentDirectory: Directory = $derived(
		findDirectoryByPage(page.url.pathname, terminalTree) ?? terminalTree
	);
	let path = $derived(dirToPathString(currentDirectory));
	let preprompt = $derived(`${user}@${hostname}:${path}`);
	const prompt = ' > ';
	let fullPrompt = $derived(preprompt + prompt);
	let showPlaceholder = $derived(terminalReady && on && !hasUserInput && placeholder.length > 0);

	function syncInputPresentation() {
		if (!terminal?.started) return;

		hasUserInput = terminal.getInputValue().length > 0;
		inputScrollLeft = input.scrollLeft;
	}

	function syncAfterTerminalKey() {
		queueMicrotask(syncInputPresentation);
	}

	const version = new Command('version', (args, options, terminal) => {
		terminal.stdout(`${page.url.hostname}@${__APP_VERSION__}`);
		return { version: __APP_VERSION__ };
	});
	version.manual = `version

Print the version of the application.
`;

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
			terminal.stdout('<span class="directory-name">..</span>');
		}
		terminal.stdout(
			currentDirectory.children
				.map((child) => `<span class="directory-name">${child.name}/</span>`)
				.join('\n')
		);
		terminal.stdout(
			currentDirectory.files.map((file) => `<span class="file-name">${file.name}</span>`).join('\n')
		);
		return { directory: currentDirectory };
	});
	ls.manual = `ls

List the contents of the current directory.
`;

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

		if (directory.page) {
			goto(directory.page, gotoOpts);
		}
		return { directory };
	});
	cd.manual = `cd &lt;directory&gt;

Change the current directory.

Examples:
  cd /projects
  cd ..
`;

	const open = new Command('open', (args, options, terminal) => {
		const targetPath = String(args[0] ?? '');
		if (!targetPath) {
			terminal.stderr('Usage: open &lt;file&gt;');
			return {};
		}

		const file = resolveFile(targetPath, currentDirectory);
		if (!file) {
			terminal.stderr(`File ${targetPath} not found`);
			return {};
		}

		if (file.href) {
			window.location.assign(file.href);
			return { href: file.href };
		}

		terminal.stdout(file.content);
		return { content: file.content };
	});
	open.manual = `open &lt;file&gt;

Open a file from the file tree.

Examples:
  open GitHub
  open Art
  open /GitHub
`;

	const contactUsage =
		'contact --name=&lt;name&gt; --email=&lt;email&gt; --message=&lt;message&gt;';
	const contact = new Command('contact', (args, options, terminal) => {
		const { name, email, message } = options;

		if (!name || !email || !message) {
			terminal.stderr(`Usage: ${contactUsage}`);
			return { error: `Usage: ${contactUsage}` };
		}

		submitForm(name.value as string, email.value as string, message.value as string)
			.then((result) => {
				if (result.success) {
					terminal.stdout('Message sent successfully');
				} else {
					terminal.stderr(result.error || 'Something went wrong.');
				}
				return result;
			})
			.catch((error) => {
				terminal.stderr(error.message || 'Something went wrong.');
				return { error: error.message || 'Something went wrong.' };
			});
	});
	contact.manual = `${contactUsage}

Submit a message to the contact form.

Examples:
  contact --name="Nick Escobar" --email="nick@nickesc.io" --message="Hello, world!"
`;

	onMount(() => {
		terminal = new Terminal({
			input,
			output,
			options: { preprompt, prompt, printCommand: true },
			commands: [ls, cd, open, theme, version, contact]
		});
		terminal.init();
		terminalReady = true;
		syncInputPresentation();

		const isDesktop = window.matchMedia('(pointer: fine)').matches;

		if (isDesktop && input) {
			input.focus();
		}

		return () => terminal.destroy();
	});

	$effect(() => {
		if (terminalReady) {
			terminal.updateOptions({ preprompt, prompt });
			syncInputPresentation();
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
				<div class:error={entry.operation === 'stderr'}>{@html String(entry.data)}</div>
			{/each}
		</div>
	</div>

	<div class="input-line">
		<input
			bind:this={input}
			disabled={!on}
			aria-label="Terminal input"
			{placeholder}
			autocomplete="off"
			autocorrect="off"
			autocapitalize="off"
			spellcheck="false"
			enterkeyhint="send"
			oninput={syncInputPresentation}
			onkeydown={syncAfterTerminalKey}
			onscroll={syncInputPresentation}
		/>
		{#if showPlaceholder}
			<div class="placeholder-viewport" aria-hidden="true">
				<span class="placeholder-content" style:transform={`translateX(${-inputScrollLeft}px)`}>
					<span class="prompt-spacer">{fullPrompt}</span><span class="placeholder-text"
						>{placeholder}</span
					>
				</span>
			</div>
		{/if}
	</div>
</div>

<style>
	.input-terminal {
		padding: 0.5rem 0.75rem;
		box-sizing: border-box;
		font: 1rem/1.5 monospace;
		color: var(--brand-grey);
		font-family: var(--terminal-font);
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
		border: 1px solid rgba(from var(--brand-grey) r g b / 0.2);
		border-right: 1px solid rgba(from var(--brand-grey) r g b / 0.1);
		border-bottom: 1px solid rgba(from var(--brand-grey) r g b / 0.1);
	}

	.output {
		flex: 1;
		min-height: 0;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		white-space: pre-wrap;

		:global(.directory-name) {
			color: rgb(124, 124, 235);
		}

		:global(.file-name) {
			color: rgb(123, 173, 156);
		}
	}

	.output-entries {
		margin-top: auto;
	}

	.error {
		color: #ff6b6b;
	}

	.input-line {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		flex-shrink: 0;
		min-width: 0;
		overflow: hidden;
	}

	input {
		grid-area: 1 / 1;
		min-width: 0;
		width: 100%;
		padding: 0;
		border: 0;
		outline: 0;
		background: transparent;
		font: inherit;
		color: inherit;
		caret-shape: underscore;
		transition: color 0.3s ease;

		&:disabled {
			color: rgba(from var(--brand-grey) r g b / 0.5);
		}

		&::placeholder {
			color: transparent;
		}
	}

	.placeholder-viewport {
		grid-area: 1 / 1;
		min-width: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.placeholder-content {
		display: inline-block;
		white-space: pre;
	}

	.prompt-spacer {
		visibility: hidden;
	}

	.placeholder-text {
		color: rgba(from var(--brand-grey) r g b / 0.5);
	}
</style>
