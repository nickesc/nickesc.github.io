import { badges } from '$lib/badges';

export { default as Badge } from '$lib/components/Badge.svelte';

export type BadgeKey = keyof typeof badges;

export const techBadges = (Object.keys(badges) as BadgeKey[]).filter((key) =>
	badges[key].categories.includes('tech')
);
