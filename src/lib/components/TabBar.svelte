<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';

	import { page } from '$app/state';
	import { tabs } from '$lib/tabs';

	import ExternalArrow from '$lib/components/ExternalArrow.svelte';
	import PowerSymbol from '$lib/components/PowerSymbol.svelte';
	import MaximizeSymbol from '$lib/components/MaximizeSymbol.svelte';
	import SoundSymbol from '$lib/components/SoundSymbol.svelte';
	import { foley } from '$lib/foley.svelte';

	let { on = $bindable(), maximized = $bindable(), fadeDuration = 300 } = $props();

	let buttonSize = '.8rem';
	let windowHeight = $state(0);
	let windowWidth = $state(0);

	function handlePowerButtonClick() {
		on = !on;
		foley.play(on ? 'ready' : 'drop');
	}

	function handleMaximizedButtonClick() {
		maximized = !maximized;
		foley.play(maximized ? 'bubble' : 'switch');
	}
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

<header>
	<nav class="scrollable">
		<ol role="tablist">
			{#each tabs as tab}
				{#if on}
					<li in:fade={{ duration: fadeDuration }} out:fade={{ duration: fadeDuration }}>
						<a
							href={tab.href}
							data-foley-click="tap"
							class:active={tab.href === page.url.pathname}
							aria-controls={tab.href}
							role="tab"
							aria-selected={tab.href === page.url.pathname}
						>
							{tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
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
			id="sound-button"
			class="window-button sound-button"
			class:sound-muted={foley.muted}
			onclick={foley.toggleMuted}
			aria-label="Interface sounds"
			role="switch"
			aria-checked={!foley.muted}
			title={foley.muted ? 'Enable interface sounds' : 'Mute interface sounds'}
			style:background-color={foley.muted
				? 'rgba(from var(--base-grey) r g b / 0.1)'
				: 'var(--grey)'}
			style:color={'var(--base-grey)'}
			style:border-color={foley.muted ? 'rgba(from var(--base-grey) r g b / 0.5)' : 'transparent'}
		>
			<SoundSymbol width={buttonSize} height={buttonSize} muted={foley.muted} />
		</button>
		{#if windowWidth > 1250 || windowHeight > 1000}
			<button
				id="maximize-button"
				class="window-button"
				onclick={handleMaximizedButtonClick}
				aria-label="Maximize window"
				aria-expanded={maximized}
				role="switch"
				aria-checked={maximized}
				title={maximized ? 'Minimize window' : 'Maximize window'}
				style:background-color={maximized
					? 'rgba(from var(--base-blue) r g b / 0.1)'
					: 'var(--blue)'}
				style:color={'var(--base-blue)'}
				style:border-color={maximized ? 'rgba(from var(--base-blue) r g b / 0.5)' : 'transparent'}
				transition:scale={{ duration: 200, easing: cubicInOut }}
			>
				<MaximizeSymbol width={buttonSize} height={buttonSize} {maximized} />
			</button>
		{/if}
		<button
			id="power-button"
			class="window-button"
			onclick={handlePowerButtonClick}
			aria-label="Toggle power"
			role="switch"
			aria-checked={on}
			title={on ? 'Turn off power' : 'Turn on power'}
			style:background-color={on ? 'var(--red)' : 'rgba(from var(--base-red) r g b / 0.1)'}
			style:color={'var(--base-red)'}
			style:border-color={on ? 'transparent' : 'rgba(from var(--base-red) r g b / 0.5)'}
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
		--base-blue: rgb(82, 160, 239);
		--base-red: var(--brand-accent);
		--base-grey: var(--brand-grey);

		--blue: rgba(from var(--base-blue) r g b / 0.2);
		--red: rgba(from var(--base-red) r g b / 0.2);
		--grey: rgba(from var(--base-grey) r g b / 0.2);

		transition:
			background-color 0.25s ease-in-out,
			color 0.25s ease-in-out,
			border-color 0.25s ease-in-out,
			opacity 0.25s ease-in-out;

		border: 1.5px solid transparent;
		margin: 0;
		cursor: pointer;
		outline: none;
		padding: 0.5rem;
		border-radius: calc(var(--corners));
		aspect-ratio: 1 / 1;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.75rem;

		&:hover {
			--blue: rgba(from var(--base-blue) r g b / 0.5);
			--red: rgba(from var(--base-red) r g b / 0.5);
			--grey: rgba(from var(--base-grey) r g b / 0.5);
		}

		&:active {
			--blue: rgba(from var(--base-blue) r g b / 0.7);
			--red: rgba(from var(--base-red) r g b / 0.7);
			--grey: rgba(from var(--base-grey) r g b / 0.7);
		}

		&:focus-visible {
			outline: 2px solid var(--brand-white);
			outline-offset: 2px;
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
						text-decoration: none;
						color: var(--brand-white);
					}

					&:active {
						background-color: rgba(from var(--brand-grey) r g b / 0.4);
					}

					&.active {
						color: var(--brand-dark);
						background-color: rgba(from var(--brand-grey) r g b / 0.7);
						font-weight: 500;

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
