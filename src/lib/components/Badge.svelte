<script lang="ts">
	import { badges } from '$lib/badges';

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
</script>

<a
	{href}
	style:--logo-color={bgColor}
	style:color={bgColor}
	title={badges[icon].title}
	rel="noopener noreferrer"
	target="_blank"
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
