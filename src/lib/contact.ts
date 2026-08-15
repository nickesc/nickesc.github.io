import { createFile } from '$lib/filetree';
import type { Directory, File } from '$lib/filetree';
import { badges } from '$lib/badges';

type BadgeKey = keyof typeof badges;

const contactBadges = (Object.keys(badges) as BadgeKey[]).filter(
	(badge) =>
		badges[badge].categories.includes('social') || badges[badge].categories.includes('distribution')
);

export function createContactFiles(parent: Directory): File[] {
	return contactBadges.map((badge) =>
		createFile(
			badges[badge].title,
			parent,
			badges[badge].url ? { href: badges[badge].url } : { content: badges[badge].text }
		)
	);
}
