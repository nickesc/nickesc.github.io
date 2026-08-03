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
