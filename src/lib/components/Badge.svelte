<script lang="ts">
	import type { SiComponentType } from '@icons-pack/svelte-simple-icons';

	interface Props {
		icon: SiComponentType;
		text: string;
		href: string;
		bgColor: string;
		textColor?: 'dark' | 'light';
	}

	let { icon: Icon, text, href, bgColor, textColor = 'light' }: Props = $props();
</script>

<a
	{href}
	style:background-color={bgColor}
	style:color={textColor === 'dark' ? 'var(--brand-dark)' : 'var(--brand-grey)'}
>
	<div
		class="badge-icon-container"
		style:color={textColor === 'dark' ? 'var(--brand-dark)' : 'var(--brand-white)'}
	>
		<Icon class="icon" title={text} />
	</div>
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
	}

	a :global(.icon) {
		flex-shrink: 0;
	}
</style>
