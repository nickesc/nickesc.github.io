<script lang="ts">
	import type { Project } from '$lib/projects';
	import SiGithub from '@icons-pack/svelte-simple-icons/icons/SiGithub';
	import SiGit from '@icons-pack/svelte-simple-icons/icons/SiGit';

	let { project, featured = false }: { project: Project; featured?: boolean } = $props();
</script>

<article class={[{ featured }, 'container']} style:--project-color={project.background}>
	<div class={[{ featured }, 'logo-container']} style="background-color: {project.background}">
		<img class={[{ featured }, 'logo']} src={project.imgUrl} alt={project.name} />
	</div>
	<div class="info-container">
		{#if featured}
			<h3 class={[featured, 'name']}>
				<a class="card-link" href={project.projectUrl} target="_blank">
					{project.name}
				</a>
			</h3>
		{:else}
			<div class="title-row">
				<h3 class="name">
					<a class="card-link" href={project.projectUrl} target="_blank">
						{project.name}
					</a>
				</h3>
				<time class="year-badge" datetime={String(project.year)}>{project.year}</time>
			</div>
			<p class="description">{project.description}</p>
			{#if project.sourceUrl}
				<ul class="link-row">
					<li>
						<a class="source-url" href={project.sourceUrl} target="_blank">
							{#if project.sourceUrl.includes('github.com')}
								<SiGithub height="1em" width="1em" style="color: var(--brand-grey)" />
							{:else}
								<SiGit height="1em" width="1em" style="color: var(--brand-grey)" />
							{/if}
							Source
						</a>
					</li>
				</ul>
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
		background-color: rgba(from var(--brand-grey) r g b / 0.8);
		padding: 0.25rem;
		border-radius: var(--corners);
		text-decoration: none;
		transition: background-color 0.2s ease-in-out;
		width: 100%;

		.link-row {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;
			list-style: none;
			padding: 0;
			margin: 0;
			margin-top: auto;
			margin-bottom: 0.5rem;
			gap: 0.5rem;

			li a {
				background-color: rgba(from var(--brand-black) r g b / 0.8);
				padding: 0.25rem 0.5rem;
				border-radius: var(--corners);
				font-size: 0.8rem;
				font-weight: 500;
				text-decoration: none;
				color: var(--brand-grey);
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.5rem;
				transition:
					background-color 0.2s ease-in-out,
					border-color 0.2s ease-in-out;

				&:hover {
					background-color: rgba(from var(--brand-black) r g b / 0.9);
				}

				&:active {
					background-color: rgba(from var(--brand-black) r g b / 1);
				}
			}
		}

		p,
		h3 {
			color: var(--brand-dark);
		}

		p {
			margin: 0.5rem 0;
		}

		&:hover {
			background-color: rgba(from var(--brand-grey) r g b / 1);

			.logo-container {
				opacity: 0.8;
			}
		}

		&:active {
			background-color: rgba(from var(--brand-grey) r g b / 0.7);
		}

		.logo-container {
			width: 100%;
			max-height: 188px;
			overflow: hidden;
			border-radius: var(--corners);
			display: flex;
			align-items: center;
			justify-content: center;
			transition: opacity 0.2s ease-in-out;
		}

		.logo {
			height: 100%;
			aspect-ratio: 1 / 1;
			object-fit: scale-down;
		}

		.title-row {
			display: flex;
			align-items: baseline;
			gap: 0.5rem;
			width: 100%;
		}

		.name {
			margin: 0;
			padding: 0;
		}

		.title-row .name {
			min-width: 0;
			flex: 1;
		}

		.year-badge {
			flex-shrink: 0;
			padding: 0.25rem 0.4rem;
			border-radius: var(--corners);
			background-color: rgba(from var(--brand-dark) r g b / 0.2);
			color: rgba(from var(--brand-dark) r g b / 0.8);
			font-family: var(--mono-font);
			font-size: 0.75rem;
			font-weight: 500;
			line-height: 1;
			white-space: nowrap;
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
			flex: 1;
			margin: 0 0.5rem;
			width: calc(100% - 1rem);
		}
	}

	.featured {
		.name {
			font-size: 1.1rem;
			font-weight: 700;
		}
	}
</style>
