<script lang="ts">
	import { fade } from 'svelte/transition';

	import { page } from '$app/state';
	import { tabs } from '$lib/tabs';

	import ExternalArrow from '$lib/components/ExternalArrow.svelte';
	import PowerSymbol from '$lib/components/PowerSymbol.svelte';
	import MaximizeSymbol from '$lib/components/MaximizeSymbol.svelte';

	let { on = $bindable(), maximized = $bindable() } = $props();

	let buttonSize = '.8rem';

	function handlePowerButtonClick() {
		on = !on;
	}

	function handleMaximizedButtonClick() {
		maximized = !maximized;
	}
</script>

<header>
	<nav class="scrollable">
		<ol>
			{#each tabs as tab}
				{#if on}
					<li in:fade={{ duration: 75 }} out:fade={{ duration: 100 }}>
						<a href={tab.href} class:active={tab.href === page.url.pathname}
							>{tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
							{#if tab.external}
								<ExternalArrow width=".75rem" height=".75rem" />
							{/if}
						</a>
					</li>
				{/if}
			{/each}
		</ol>
	</nav>
	<span
		style:display="flex"
		style:flex-direction="row"
		style:align-items="center"
		style:justify-content="center"
		style:gap=".35rem"
	>
		<button
			id="maximize-button"
			class="window-button"
			onclick={handleMaximizedButtonClick}
			aria-label="Maximize window"
			aria-expanded={maximized}
			style:background-color={maximized ? 'transparent' : 'var(--green)'}
			style:color={maximized ? 'var(--green)' : 'rgba(from var(--brand-dark) r g b / 0.7)'}
			style:border-color={maximized ? 'var(--green)' : 'transparent'}
		>
			<MaximizeSymbol width={buttonSize} height={buttonSize} {maximized} />
		</button>
		<button
			id="power-button"
			class="window-button"
			onclick={handlePowerButtonClick}
			aria-label="Toggle power"
			role="switch"
			aria-checked={on}
			style:background-color={on ? 'var(--red)' : 'transparent'}
			style:color={on ? 'rgba(from var(--brand-dark) r g b / 0.7)' : 'var(--red)'}
			style:border-color={on ? 'transparent' : 'var(--red)'}
		>
			<PowerSymbol width={buttonSize} height={buttonSize} />
		</button>
	</span>
</header>

<style>
	header {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
		padding: 0.5rem;
		gap: 1rem;
	}

	.window-button {
		--green: rgba(82, 160, 239, 0.8);
		--red: rgba(from var(--brand-accent) r g b / 0.8);

		transition:
			background-color 0.25s ease-in-out,
			color 0.25s ease-in-out,
			border-color 0.25s ease-in-out,
			opacity 0.25s ease-in-out;

		border: 1.5px solid transparent;
		margin: 0;
		cursor: pointer;
		outline: none;
		padding: 0.2rem;
		border-radius: calc(var(--window-corners) / 1.6);
		aspect-ratio: 1 / 1;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			opacity: 0.65;
		}

		&:active {
			opacity: 0.5;
		}
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
					display: inline-flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					gap: 0.2rem;
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
