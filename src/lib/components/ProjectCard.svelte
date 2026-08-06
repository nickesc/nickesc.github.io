<script lang="ts">
	import type { Project } from '$lib/projects';
	let { project, featured = false }: { project: Project; featured?: boolean } = $props();
</script>

<article class={[{ featured }, 'container']} style:--project-color={project.background}>
	<div class={[{ featured }, 'logo-container']} style="background-color: {project.background}">
		<img class={[{ featured }, 'logo']} src={project.imgUrl} alt={project.name} />
	</div>
	<div class="info-container">
		<h3 class={[featured, 'name']}>
			<a class="card-link" href={project.projectUrl} target="_blank">
				{project.name}
			</a>
		</h3>

		{#if !featured}
			<p class="description">{project.description}</p>
			{#if project.sourceUrl}
				<a class="source-url" href={project.sourceUrl} target="_blank"> View Source </a>
			{/if}
		{/if}
	</div>
</article>

<style>
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 0.25rem;
		background-color: rgba(from var(--brand-grey) r g b / 0.85);
		padding: 0.25rem;
		border-radius: var(--corners);
		text-decoration: none;
		transition: background-color 0.2s ease-in-out;

		p,
		h3 {
			color: var(--brand-dark);
		}

		&:hover {
			background-color: rgba(from var(--brand-grey) r g b / 1);
		}

		&:active {
			background-color: rgba(from var(--brand-grey) r g b / 1);
		}

		.logo-container {
			width: 100%;
			aspect-ratio: 16 / 7;
			overflow: hidden;
			border-radius: var(--corners);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.logo {
			height: 100%;
			aspect-ratio: 1 / 1;
			object-fit: scale-down;
		}

		.name {
			margin: 0;
			padding: 0;
		}

		.card-link {
			color: inherit;
			text-decoration: none;

			&::after {
				position: absolute;
				inset: 0;
				border-radius: var(--corners);
				content: '';
			}

			&:focus-visible::after {
				outline: 2px solid currentColor;
				outline-offset: 2px;
			}
		}

		.url,
		.source-url {
			position: relative;
			z-index: 1;
		}

		.info-container {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;
			margin: 0 0.5rem;
		}
	}

	.featured {
		.name {
			font-size: 1.1rem;
			font-weight: 700;
		}

		.logo-container {
			aspect-ratio: 4.5 / 3;
		}
	}
</style>
