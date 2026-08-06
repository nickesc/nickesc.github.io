<script lang="ts">
	import type { SiComponentType } from '@icons-pack/svelte-simple-icons';

	interface Props {
		icon: SiComponentType;
		text: string;
		href: string;
		bgColor: string;
	}

	let { icon: Icon, text, href, bgColor }: Props = $props();
</script>

<a {href} style:--logo-color={bgColor} style:color={bgColor} target="_blank">
	<Icon class="icon" title={text} />

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
