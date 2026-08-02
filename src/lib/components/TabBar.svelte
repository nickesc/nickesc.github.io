<script lang="ts">
	import { page } from '$app/state';

	const tabs = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Projects',
			href: '/projects'
		},
		{
			name: 'Resume',
			href: '/resume'
		},
		{
			name: 'Contact',
			href: '/contact'
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
</script>

<nav>
	<ol>
		{#each tabs as tab}
			<li>
				<a href={tab.href} class:active={tab.href === page.url.pathname}>{tab.name}</a>
			</li>
		{/each}
	</ol>
</nav>

<style>
	nav ol {
		list-style: none;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 1rem;
		margin: 0;
		gap: 1rem;
	}
	nav ol li {
		margin: 0;
		padding: 0;
	}
</style>
