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
</script>

<nav>
	<ol>
		{#each tabs as tab}
			<li class:active={tab.href === page.url.pathname}>
				<a href={tab.href}>{tab.name}</a>
			</li>
		{/each}
	</ol>
</nav>

<style>
	nav {
		overflow-x: scroll;
		box-sizing: content-box;
		scrollbar-width: none;
		ol {
			list-style: none;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			padding: 0;
			margin: 0;
			gap: 0.5rem;

			li {
				margin: 0;
				padding: 0.25rem 0.5rem;
				transition: background-color 0.1s ease-in-out;

				a,
				a:visited {
					color: var(--brand-white);
					text-decoration: none;
					transition: color 0.1s ease-in-out;
				}

				&:hover {
					background-color: rgba(from var(--brand-grey) r g b / 0.25);
					border-radius: var(--corners);
				}

				&.active {
					background-color: rgba(from var(--brand-grey) r g b / 0.7);
					border-radius: var(--corners);

					a,
					a:visited {
						color: var(--brand-dark);
					}

					&:hover {
						background-color: rgba(from var(--brand-grey) r g b / 0.5);
					}
				}
			}
		}
	}
</style>
