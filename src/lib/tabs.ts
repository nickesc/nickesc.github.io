import type { Directory, File } from '$lib/filetree';
import { createDirectory, createFile } from '$lib/filetree';

type Tab = {
	name: string;
	href: string;
	external?: boolean;
};

export const tabs: Tab[] = [
	{
		name: 'home',
		href: '/'
	},
	{
		name: 'projects',
		href: '/projects'
	},
	{
		name: 'contact',
		href: '/contact'
	},
	{
		name: 'resume',
		href: '/resume'
	},
	{
		name: 'GitHub',
		href: 'https://github.com/nickesc',
		external: true
	},
	{
		name: 'Art',
		href: 'https://nickesc.com/',
		external: true
	}
];

const root: Directory = createDirectory('home', null);

export const tabTree: Directory = {
	...root,
	children: tabs
		.filter((tab) => tab.href !== '/' && !tab.external)
		.map((tab): Directory => createDirectory(tab.name, root)),
	files: tabs.filter((tab) => tab.external).map((tab): File => createFile(tab.name, tab.href, root))
};
