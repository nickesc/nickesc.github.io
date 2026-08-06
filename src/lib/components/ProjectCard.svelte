<script lang="ts">
	import type { Project } from '$lib/projects';
	import { scale } from 'svelte/transition';
	let { project, featured = false }: { project: Project; featured?: boolean } = $props();
</script>

<a
	href={project.projectUrl}
	target="_blank"
	class={[{ featured }, 'container']}
	style:--project-color={project.background}
>
	<div class={[{ featured }, 'logo-container']} style="background-color: {project.background}">
		<img class={[{ featured }, 'logo']} src={project.imgUrl} alt={project.name} />
	</div>

	<h3 class={[featured, 'name']}>{project.name}</h3>

	{#if !featured}
		<p class="description">{project.description}</p>
		<!-- svelte-ignore node_invalid_placement_ssr -->
		<a class="url" href={project.projectUrl} target="_blank">View Project</a>
		<!-- svelte-ignore node_invalid_placement_ssr -->
		<a class="source-url" href={project.sourceUrl} target="_blank">View Source</a>
	{/if}
</a>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 0.25rem;
		background-color: rgba(from var(--brand-grey) r g b / 0.85);
		padding: 0.25rem;
		border-radius: var(--corners);
		text-decoration: none;
		transition:
			background-color 0.2s ease-in-out,
			outline 0.2s ease-in-out,
			outline-offset 0.2s ease-in-out;
		outline: 1.5px solid transparent;
		outline-offset: 3px;

		p,
		h3 {
			color: var(--brand-dark);
		}

		&:hover {
			background-color: rgba(from var(--brand-grey) r g b / 1);
			outline: 1.5px solid rgba(from var(--project-color) r g b / 0.5);
		}

		&:active {
			background-color: rgba(from var(--brand-grey) r g b / 1);
			outline: 1.5px solid rgba(from var(--project-color) r g b / 0.7);
			outline-offset: 2px;
		}

		.logo-container {
			width: 100%;
			height: 100%;
			overflow: hidden;
			border-radius: var(--corners);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.logo {
			width: 50%;
			height: 100%;
			aspect-ratio: 1/1;
			object-fit: scale-down;
		}

		.name {
			margin: 0;
			padding: 0;
		}
	}

	.featured {
		.name {
			font-size: 1.1rem;
			font-weight: 700;
		}

		.logo {
			width: 70%;
		}
	}
</style>
