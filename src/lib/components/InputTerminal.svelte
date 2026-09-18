<script lang="ts">
	import { onMount } from 'svelte';
	import { Terminal, Command, ExitObject } from 'input-terminal';
	import { SvelteOutputAdapter } from 'input-terminal/svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { PathnameWithSearchOrHash } from '$app/types';

	import { submitForm } from '$lib/submitForm';
	import { createProjectFiles } from '$lib/projects';
	import { createContactFiles } from '$lib/contact';
	import { createResumeFiles } from '$lib/resume';
	import { games as gameList } from '$lib/games';

	import { tabTree } from '$lib/tabs.svelte';
	import { foley } from '$lib/foley.svelte';
	import { completeTerminalInput } from '$lib/terminalCompletion';
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
		placeholder = "Type 'help' for more information..."
	}: {
		on: boolean;
		onThemeChange?: (id?: Background) => Background | false;
		placeholder?: string;
	} = $props();

	let input: HTMLInputElement;
	let outputElement: HTMLElement;
	const output = new SvelteOutputAdapter();
	let terminal: Terminal;

	type PersistedTerminalState = {
		history: string[];
		output: { operation: 'command' | 'stdout' | 'stderr'; data: string }[];
		historyUpdatedAt: number;
		user: string;
	};
	// The route stays URL-owned so the working directory always matches the page being viewed.

	const TERMINAL_STORAGE_KEY = 'nickesc:terminal-state';
	const HISTORY_TTL_MS = 24 * 60 * 60 * 1000;
	const OUTPUT_EVENTS = ['command', 'stdout', 'stderr', 'clear'] as const;

	let hostname = $state(page.url.hostname);
	let user = $state('user');
	let terminalReady = $state(false);
	let hasUserInput = $state(false);
	let inputScrollLeft = $state(0);
	let placeholderSuppressed = $state(false);

	let terminalTree: Directory = tabTree;

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
	let showPlaceholder = $derived(
		terminalReady && on && !hasUserInput && !placeholderSuppressed && placeholder.length > 0
	);

	function saveTerminalState() {
		try {
			const state: PersistedTerminalState = {
				history: terminal.history.items.map((item) => item.rawInput),
				output: output.entries.map(({ operation, data }) => ({
					operation,
					data: String(data)
				})),
				historyUpdatedAt: Date.now(),
				user
			};

			localStorage.setItem(TERMINAL_STORAGE_KEY, JSON.stringify(state));
		} catch {
			// The terminal remains usable when storage is full or unavailable.
		}
	}

	function loadTerminalState(): PersistedTerminalState {
		try {
			const state = JSON.parse(
				localStorage.getItem(TERMINAL_STORAGE_KEY) ?? 'null'
			) as PersistedTerminalState | null;
			if (state && Array.isArray(state.history) && Array.isArray(state.output)) {
				if (
					!Number.isFinite(state.historyUpdatedAt) ||
					Date.now() - state.historyUpdatedAt >= HISTORY_TTL_MS
				) {
					state.history = [];
					state.output = [];
					state.historyUpdatedAt = Date.now();
					localStorage.setItem(TERMINAL_STORAGE_KEY, JSON.stringify(state));
				}
				return state;
			}
		} catch {
			// Start with a fresh terminal when saved state cannot be read.
		}
		return { history: [], output: [], historyUpdatedAt: Date.now(), user: 'user' };
	}

	function syncInputPresentation() {
		if (!terminal?.started) return;

		hasUserInput = terminal.getInputValue().length > 0;
		inputScrollLeft = input.scrollLeft;
	}

	function syncAfterTerminalKey(event: KeyboardEvent) {
		if (event.key.length === 1 || event.key === 'Backspace') {
			foley.playType();
		}
		queueMicrotask(syncInputPresentation);
	}

	function handleInput() {
		placeholderSuppressed = true;
		syncInputPresentation();
	}

	function handleBlur() {
		placeholderSuppressed = false;
		syncInputPresentation();
	}

	function commandFailed(exit: ExitObject) {
		return exit.exitCode !== 0 || exit.stderrLog.length > 0;
	}

	function playCommandResult(failed: boolean) {
		foley.play(failed ? 'ping' : 'pop');
	}

	function gotoPage(route: string): Record<'page', string> {
		goto(route, { replaceState: true, noScroll: true, keepFocus: true });
		return { page: route };
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
		const showHidden = 'a' in options || 'all' in options;
		const visibleChildren = currentDirectory.children.filter(
			(child) => showHidden || !child.hidden
		);
		const visibleFiles = currentDirectory.files.filter((file) => showHidden || !file.hidden);

		if (currentDirectory.parent !== null) {
			terminal.stdout('<span class="directory-name">..</span>');
		}
		terminal.stdout(
			visibleChildren
				.map(
					(child) =>
						`<span class="directory-name${child.hidden ? ' hidden-item' : ''}">${child.name}/</span>`
				)
				.join('\n')
		);
		terminal.stdout(
			visibleFiles
				.map(
					(file) =>
						`<span class="file-name${file.hidden ? ' hidden-item' : ''}">${file.name}</span>`
				)
				.join('\n')
		);
		return { directory: currentDirectory };
	});
	ls.manual = `ls [-a | --all]

List the contents of the current directory. Use \`-a\` or \`--all\` to include hidden entries.
`;

	function navigateToDirectory(targetPath: string, terminal: Terminal): Directory | null {
		const directory = resolveDirectory(targetPath, currentDirectory);
		if (!directory) return null;

		if (directory === currentDirectory) {
			terminal.stderr(`Already at ${dirToPathString(directory)}`);
			return directory;
		}

		if (directory.page) {
			goto(directory.page, { replaceState: true, noScroll: true, keepFocus: true });
		}

		return directory;
	}

	const cd = new Command('cd', (args, options, terminal) => {
		const targetPath = String(args[0] ?? '~');
		const directory = navigateToDirectory(targetPath, terminal);

		if (!directory) {
			terminal.stderr(`Directory ${targetPath} not found`);
			return { directory: currentDirectory };
		}

		return { directory };
	});
	cd.manual = `cd &lt;directory&gt;

Change the current directory.

Examples:
  cd /projects
  cd ..
`;

	const mgic = new Command('mgic', (args, options, terminal) => {
		return gotoPage('/mgic');
	});
	mgic.manual = `mgic

Open my Spotify status page.
`;

	const games = new Command('games', (args, options, terminal) => {
		if (options.list) {
			terminal.stdout(gameList.map((game) => game.id).join('\n'));
			return { games: games };
		}

		if (args[0]) {
			return gotoPage(`/games?id=${args[0]}`);
		}
		return gotoPage('/games');
	});
	games.manual = `games [--list | &lt;game&gt;]

    Play games on the site. Use \`--list\` to list all available games.

Examples:
  games    --list      # list all available games
  games    starfish    # open the Starfish game
`;

	const open = new Command('open', (args, options, terminal) => {
		const targetPath = String(args[0] ?? '');
		if (!targetPath) {
			terminal.stderr('Usage: open &lt;path&gt;');
			return {};
		}

		const directory = navigateToDirectory(targetPath, terminal);
		if (directory) {
			return { directory };
		}

		const file = resolveFile(targetPath, currentDirectory);
		if (!file) {
			terminal.stderr(`Path ${targetPath} not found`);
			return {};
		}

		if (file.href) {
			const url = new URL(file.href, page.url);
			if (url.origin === page.url.origin) {
				const route = `${url.pathname}${url.search}${url.hash}` as PathnameWithSearchOrHash;
				goto(resolve(route), { replaceState: true, noScroll: true, keepFocus: true });
			} else {
				window.location.assign(url);
			}
			return { page: file.href };
		}

		terminal.stdout(file.content);
		return { page: file.content };
	});
	open.manual = `open &lt;path&gt;

Open a file or move to a directory in the file tree.

Examples:
  open projects
  open GitHub
  open /contact
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
					playCommandResult(false);
				} else {
					terminal.stderr(result.error || 'Something went wrong.');
					playCommandResult(true);
				}
				return result;
			})
			.catch((error) => {
				terminal.stderr(error.message || 'Something went wrong.');
				playCommandResult(true);
				return { error: error.message || 'Something went wrong.' };
			});
	});
	contact.manual = `${contactUsage}

Submit a message to the contact form.

Examples:
  contact --name="Nick Escobar" --email="nick@nickesc.io" --message="Hello, world!"
`;

	const userCommand = new Command('user', (args, options, terminal) => {
		if (options.set) {
			let error: boolean = options.set?.value ? false : true;
			if (error) {
				terminal.stderr('Error: user name is required.\nUsage: user --set=&lt;user&gt;');
				return {
					error: 'Error: user name is required.\nUsage: user --set=&lt;user&gt;',
					user: user
				};
			}
			user = options.set.value as string;
		}
		terminal.stdout(user);
		return { user: user };
	});
	userCommand.manual = `user [--set=&lt;user&gt;]

Print or set the current user.

Examples:
  user                 # print the current user
  user --set=nickesc   # set the current user to nick
`;

	const help = new Command('help', (args, options, terminal) => {
		const commandName = args[0] === undefined ? undefined : String(args[0]);
		if (commandName) {
			const command = terminal.bin.find(commandName);
			if (!command) {
				terminal.stderr('Command not found. Run `help` to see the site commands.');
				return {};
			}

			terminal.stdout(command.manual ?? command.key);
			return { command: command.key };
		}

		terminal.stdout(`This terminal acts as a command line for the website. Pages are directories, links and content are files.

Site commands:<span class="command-list">
  ls [-a | --all]            List dirs and files here (dirs end with /)
  cd &lt;directory&gt;             Move to a page (\`cd /projects\`, \`cd ..\`, \`cd ~\`)
  open &lt;path&gt;                Move to a directory, open a link, or print file content
  user [--set=&lt;user&gt;]        Print or set the current user
  theme [list | &lt;name&gt;]      Cycle themes, list them, or set one by name
  contact --name= --email= --message=
                             Submit the contact form
  mgic                       Open my Spotify status page
  games [--list | &lt;game&gt;]    Play games on the site. Use \`--list\` to list all available games.
  version                    Print the site version
  help [command]             Show this guide or details for one command</span>

Useful Built-in commands:<span class="command-list">
  clear                      Clear the terminal output
  echo [text]                Print text to the terminal
  history                    Show previously run commands
  commands                   List every available command
  man &lt;command&gt;              Show a command's manual</span>

Keyboard:<span class="command-list">
  Enter                      Run the command
  Tab                        Autocomplete commands and paths (press again to cycle)
  Up / Down                  Step through command history</span>

Try <span class="command-list">\`ls\`</span>, then <span class="command-list">\`cd projects\`</span>. Run <span class="command-list">\`help &lt;command&gt;\`</span> or <span class="command-list">\`man &lt;command&gt;\`</span> for examples.`);
		return {
			commands: terminal.bin.list.map((command: Command) => command.key)
		};
	});
	help.manual = `help [command]

Explain how to use the site terminal. Provide a command name to see its full usage.

Examples:
  help
  help cd
  help contact
`;

	onMount(() => {
		const restoredState = loadTerminalState();
		user = restoredState.user || 'user';
		restoredState.output.forEach((entry, index) => {
			output[entry.operation](entry.data, {
				sequence: index - restoredState.output.length,
				timestamp: Date.now()
			});
		});

		terminal = new Terminal({
			input,
			output,
			options: { preprompt, prompt, printCommand: true },
			history: restoredState.history.map(
				(rawInput) => new ExitObject([], rawInput, undefined, 0, {})
			),
			commands: [ls, cd, open, theme, version, contact, mgic, games, help, userCommand],
			completionProvider: ({ input: value, cursor }) =>
				completeTerminalInput(value, cursor, currentDirectory)
		});
		terminal.init();
		terminalReady = true;
		syncInputPresentation();

		function onExecuted(event: CustomEvent<ExitObject>) {
			const exit = event.detail;
			if (!exit.rawInput.trim()) return;
			saveTerminalState();
			// contact waits for the form request before playing a result cue
			if (exit.command?.key === 'contact' && !commandFailed(exit)) return;
			playCommandResult(commandFailed(exit));
		}

		function suppressEnterFoley(event: KeyboardEvent) {
			if (event.key === 'Enter') event.stopPropagation();
		}

		OUTPUT_EVENTS.forEach((event) => terminal.addEventListener(event, saveTerminalState));
		terminal.addEventListener('executed', onExecuted);
		input.addEventListener('keydown', suppressEnterFoley);

		const isDesktop = window.matchMedia('(pointer: fine)').matches;

		if (isDesktop && input) {
			input.focus();
		}

		return () => {
			OUTPUT_EVENTS.forEach((event) => terminal.removeEventListener(event, saveTerminalState));
			terminal.removeEventListener('executed', onExecuted);
			input.removeEventListener('keydown', suppressEnterFoley);
			terminal.destroy();
		};
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
			oninput={handleInput}
			onkeydown={syncAfterTerminalKey}
			onscroll={syncInputPresentation}
			onblur={handleBlur}
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
		color: var(--terminal-white);
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
		color: var(--terminal-white);

		:global(.directory-name) {
			color: var(--terminal-blue);
		}

		:global(.file-name) {
			color: var(--terminal-green);
		}

		:global(.hidden-item) {
			color: var(--terminal-grey);
		}
	}

	.output-entries {
		margin-top: auto;
	}

	.error {
		color: var(--terminal-red);
	}

	:global(.command-list) {
		color: var(--terminal-grey);
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
			color: rgba(from var(--terminal-grey) r g b / 0.5);
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
		color: var(--terminal-grey);
	}
</style>
