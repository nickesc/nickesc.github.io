export type File = {
	type: 'file';
	name: string;
	parent: Directory | null;
	content: string;
	href?: string;
};

export type Directory = {
	type: 'directory';
	name: string;
	page?: string;
	parent: Directory | null;
	children: Directory[];
	files: File[];
};

export function createFile(
	name: string,
	parent: Directory,
	{ content = '', href }: { content?: string; href?: string } = {}
): File {
	return {
		type: 'file',
		name,
		parent,
		content,
		href
	};
}

export function createDirectory(
	name: string,
	parent: Directory | null,
	page?: string
): Directory {
	return {
		type: 'directory',
		name,
		page,
		parent,
		children: [],
		files: []
	};
}

export function dirToPath(dir: Directory): string[] {
	const path: string[] = [];
	while (dir.parent) {
		path.unshift(dir.name);
		dir = dir.parent;
	}
	return path;
}

export function dirToPathString(dir: Directory): string {
	const parts = dirToPath(dir);
	return parts.length === 0 ? '/' : `/${parts.join('/')}`;
}

export function getRoot(directory: Directory): Directory {
	while (directory.parent) {
		directory = directory.parent;
	}
	return directory;
}

export function findChildDir(name: string, searchFrom: Directory): Directory | null {
	return searchFrom.children.find((child) => child.name === name) ?? null;
}

export function findChildFile(name: string, searchFrom: Directory): File | null {
	return searchFrom.files.find((file) => file.name === name) ?? null;
}

export function findDirectoryByPage(page: string, searchFrom: Directory): Directory | null {
	if (searchFrom.page === page) return searchFrom;

	for (const child of searchFrom.children) {
		const match = findDirectoryByPage(page, child);
		if (match) return match;
	}

	return null;
}

/** Resolve an absolute or relative directory path from `currentDirectory`. Supports `/`, `~`, `.`, and `..`. */
export function resolveDirectory(
	pathString: string,
	currentDirectory: Directory
): Directory | null {
	const root = getRoot(currentDirectory);

	if (pathString === '' || pathString === '/' || pathString === '~') {
		return root;
	}

	let current: Directory;
	let remainder: string;

	if (pathString.startsWith('~/')) {
		current = root;
		remainder = pathString.slice(2);
	} else if (pathString.startsWith('/')) {
		current = root;
		remainder = pathString.slice(1);
	} else {
		current = currentDirectory;
		remainder = pathString;
	}

	for (const part of remainder.split('/')) {
		if (part === '' || part === '.') continue;
		if (part === '..') {
			current = current.parent ?? current;
			continue;
		}

		const child = findChildDir(part, current);
		if (!child) return null;
		current = child;
	}

	return current;
}

/** Resolve an absolute or relative file path from `currentDirectory`. */
export function resolveFile(pathString: string, currentDirectory: Directory): File | null {
	if (!pathString || pathString === '/' || pathString === '~' || pathString.endsWith('/')) {
		return null;
	}

	const slash = pathString.lastIndexOf('/');
	if (slash === -1) {
		return findChildFile(pathString, currentDirectory);
	}

	const dirPart = pathString.slice(0, slash) || '/';
	const name = pathString.slice(slash + 1);
	if (!name || name === '.' || name === '..') return null;

	const directory = resolveDirectory(dirPart, currentDirectory);
	if (!directory) return null;

	return findChildFile(name, directory);
}
