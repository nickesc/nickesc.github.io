import { createFile, type Directory, type File } from './filetree';
import { SITE_ORIGIN, SITE_DOMAIN } from './info';

export const resumeLinks = [
	{
		label: 'Email',
		href: 'mailto:nick@nickesc.io',
		displayText: 'nick@nickesc.io'
	},
	{
		label: 'LinkedIn',
		href: 'https://linkedin.com/in/nickesc/',
		displayText: 'linkedin.com/in/nickesc'
	},
	{
		label: 'Bluesky',
		href: 'https://bsky.app/profile/nickesc.io',
		displayText: '@nickesc.io'
	},
	{
		label: 'Portfolio',
		href: SITE_ORIGIN,
		displayText: SITE_DOMAIN
	},
	{
		label: 'GitHub',
		href: 'https://github.com/nickesc',
		displayText: 'github.com/nickesc'
	},
	{
		label: 'Art',
		href: 'https://nickesc.com',
		displayText: 'nickesc.com'
	}
];

export function createResumeFiles(parent: Directory): File[] {
	return resumeLinks.map((link) =>
		createFile(link.label, parent, link.href ? { href: link.href } : { content: link.displayText })
	);
}
