<script lang="ts">
	let { label = 'Loading' }: { label?: string } = $props();
</script>

<div class="loading-spinner" role="status">
	<div class="loading-spinner-inner" aria-hidden="true"></div>
	<span class="visually-hidden">{label}</span>
</div>

<style>
	.loading-spinner {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		background: var(--brand-black);
	}

	.loading-spinner-inner {
		width: clamp(2rem, 10%, 3.5rem);
		aspect-ratio: 1;
		box-sizing: border-box;
		border: 3px solid rgba(from var(--terminal-brightwhite) r g b / 0.2);
		border-top-color: var(--brand-accent);
		border-radius: 50%;
		animation: spin 800ms linear infinite;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@keyframes spin {
		to {
			rotate: 1turn;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.loading-spinner-inner {
			animation: none;
		}
	}
</style>
