import type { Directory } from '$lib/filetree';
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
