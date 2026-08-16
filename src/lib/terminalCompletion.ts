import { resolveDirectory, type Directory } from './filetree';

type PathCompletionMode = 'directories' | 'files-and-directories';

function normalizePathInput(input: string): string {
	const openingQuote = input[0];
	let path = input;

	if (openingQuote === '"' || openingQuote === "'" || openingQuote === '`') {
		path = path.slice(1);
		if (path.endsWith(openingQuote)) {
			path = path.slice(0, -1);
		}
	}

	return path.replaceAll('\\', '');
}

function formatPath(path: string): string {
	if (!/[\s"'`]/.test(path)) return path;

	return `"${path.replace(/(["\\])/g, '\\$1')}"`;
}

function completePath(
	pathInput: string,
	currentDirectory: Directory,
	mode: PathCompletionMode
): string[] {
	const path = normalizePathInput(pathInput);
	const slashIndex = path.lastIndexOf('/');
	const directoryPrefix = slashIndex === -1 ? '' : path.slice(0, slashIndex + 1);
	const partialName = slashIndex === -1 ? path : path.slice(slashIndex + 1);
	const searchDirectory = directoryPrefix
		? resolveDirectory(directoryPrefix, currentDirectory)
		: currentDirectory;

	if (!searchDirectory) return [];

	const directories = searchDirectory.children
		.filter((directory) => directory.name.startsWith(partialName))
		.map((directory) => `${directoryPrefix}${directory.name}/`);

	if (mode === 'directories') return directories;

	const files = searchDirectory.files
		.filter((file) => file.name.startsWith(partialName))
		.map((file) => `${directoryPrefix}${file.name}`);

	return [...directories, ...files];
}

export function completeTerminalInput(
	input: string,
	cursor: number,
	currentDirectory: Directory
): string[] | undefined {
	const inputBeforeCursor = input.slice(0, cursor);
	const match = /^(cd|open)(\s+)(.*)$/.exec(inputBeforeCursor);
	if (!match) return undefined;

	const [, command, spacing, pathInput] = match;
	const mode: PathCompletionMode = command === 'cd' ? 'directories' : 'files-and-directories';

	return completePath(pathInput, currentDirectory, mode).map(
		(path) => `${command}${spacing}${formatPath(path)}`
	);
}
