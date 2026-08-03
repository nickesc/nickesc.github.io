export type File = {
	type: 'file';
	name: string;
	path: string;
	parent: Directory | null;
	content: string;
};

export type Directory = {
	type: 'directory';
	name: string;
	path: string;
	parent: Directory | null;
	children: (File | Directory)[];
};

export function getFromPath(root: Directory, path: string): Directory | File {
	if (path === '/') {
		return root;
	}
	const target = root.children.find((child) => child.path === path);
	if (!target) {
		throw new Error(`Directory ${path} not found`);
	}
	return target;
}
