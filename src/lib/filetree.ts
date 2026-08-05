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

export function createFile(name: string, content: string, parent: Directory, href?: string): File {
	return {
		type: 'file',
		name,
		parent,
		content,
		href: href ?? undefined
	};
}

export function createDirectory(name: string, parent: Directory | null): Directory {
	return {
		type: 'directory',
		name,
		parent,
		children: [],
		files: []
	};
}

export function dirToPath(dir: Directory): string[] {
	const path = [];
	while (dir.parent) {
		path.unshift(dir.name);
		dir = dir.parent;
	}
	return path;
}

export function dirToPathString(dir: Directory): string {
	return `/${dirToPath(dir).join('/')}`;
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
