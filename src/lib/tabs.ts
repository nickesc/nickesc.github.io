import type { Directory } from '$lib/filetree';

export const tabs = [
	{
		name: 'Home',
		href: '/'
	},
	{
		name: 'Projects',
		href: '/projects'
	},
	{
		name: 'Contact',
		href: '/contact'
	},
	{
		name: 'Resume',
		href: '/resume'
	},
	{
		name: 'GitHub',
		href: 'https://github.com/nickesc'
	},
	{
		name: 'Art',
		href: 'https://nickesc.com/'
	}
];

const root: Directory = {
	type: 'directory',
	name: 'root',
	path: '/',
	parent: null,
	children: []
};

export const tabTree: Directory = {
	...root,
	children: tabs
		.filter((tab) => tab.href !== '/')
		.map((tab): Directory => ({
			type: 'directory',
			name: tab.name,
			path: tab.href,
			parent: root,
			children: []
		}))
};
