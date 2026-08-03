<script lang="ts">
	import { page } from '$app/state';
	import { tabs } from '$lib/tabs';

	let { on = $bindable() } = $props();

	function handlePowerButtonClick() {
		on = !on;
	}
</script>

<header style:justify-content={on ? 'space-between' : 'flex-end'}>
	{#if on}
		<nav class="scrollable">
			<ol>
				{#each tabs as tab}
					<li>
						<a href={tab.href} class:active={tab.href === page.url.pathname}>{tab.name}</a>
					</li>
				{/each}
			</ol>
		</nav>
	{/if}
	<button id="power-button" onclick={handlePowerButtonClick}>
		{#if on}
			X
		{:else}
			O
		{/if}
	</button>
</header>

<style>
	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem;
	}

	nav {
		overflow-x: scroll;

		ol {
			list-style: none;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			padding: 0;
			margin: 0;
			gap: 0.3rem;

			li {
				a,
				a:visited {
					display: inline-block;
					color: var(--brand-white);
					text-decoration: none;
					padding: 0.25rem 0.5rem;
					border-radius: var(--corners);
					transition:
						color 0.1s ease-in-out,
						background-color 0.1s ease-in-out;

					&:hover,
					&:focus {
						background-color: rgba(from var(--brand-grey) r g b / 0.25);
						outline: none;
					}

					&:active {
						background-color: rgba(from var(--brand-grey) r g b / 0.4);
					}

					&.active {
						color: var(--brand-dark);
						background-color: rgba(from var(--brand-grey) r g b / 0.7);

						&:hover,
						&:focus {
							background-color: rgba(from var(--brand-grey) r g b / 0.5);
							outline: none;
						}
					}
				}
			}
		}
	}
</style>
