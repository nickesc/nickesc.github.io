<script lang="ts">
	import { badges } from '$lib/badges';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { PathnameWithSearchOrHash } from '$app/types';

	interface Props {
		icon: keyof typeof badges;
		text?: string;
		href?: string;
		bgColor?: string;
	}

	let {
		icon,
		text = badges[icon].text,
		href = badges[icon].url,
		bgColor = badges[icon].color
	}: Props = $props();

	const Icon = $derived(badges[icon].icon);
	const external = $derived(new URL(href, page.url).origin !== page.url.origin);
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Resolve local paths; pass other URLs through. -->
<a
	href={external ? href : resolve(href as PathnameWithSearchOrHash)}
	data-foley-click="pop"
	style:--logo-color={bgColor}
	style:color={bgColor}
	title={badges[icon].title}
	rel={external ? 'external noopener noreferrer' : undefined}
	target={external ? '_blank' : undefined}
>
	<Icon class="icon" title={text} color={bgColor} />

	{text}
</a>

<style>
	a {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		white-space: nowrap;
		text-decoration: none;
		padding: 0.25rem 0.5rem;
		border-radius: var(--corners);
		background-color: rgba(from var(--logo-color) r g b / 0.25);
		border: 1.5px solid transparent;
		transition:
			background-color 0.2s ease-in-out,
			border 0.2s ease-in-out;

		&:hover {
			background-color: rgba(from var(--logo-color) r g b / 0.5);
		}

		&:active {
			background-color: rgba(from var(--logo-color) r g b / 0.75);
			border-color: var(--logo-color);
		}
	}

	a :global(.icon) {
		flex-shrink: 0;
	}
</style>
