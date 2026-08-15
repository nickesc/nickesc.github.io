import type { Directory } from '$lib/filetree';
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

const root: Directory = createDirectory('home', null, '/');

for (const tab of tabs) {
	if (tab.href === '/') continue;

	if (tab.external) {
		root.files.push(createFile(tab.name, root, { href: tab.href }));
	} else {
		root.children.push(createDirectory(tab.name, root, tab.href));
	}
}

export const tabTree: Directory = root;
