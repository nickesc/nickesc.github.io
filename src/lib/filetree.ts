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
