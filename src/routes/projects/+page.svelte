<script lang="ts">
	import { projects } from '$lib/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { onMount } from 'svelte';

	let displayedProjects = $state(projects);
	let selectedCategory = $state('all');
	let selectedYear: number | 'all' = $state<number | 'all'>('all');
	let showArchived = $state(false);

	let delay = 0;

	const years: number[] = $derived(Array.from(new Set(projects.map((project) => project.year))));
	const categories: string[] = $derived(
		Array.from(new Set(projects.map((project) => project.category)))
	);

	function filterProjects() {
		if (selectedCategory === 'all' && selectedYear === 'all' && showArchived) {
			displayedProjects = projects;
		} else {
			displayedProjects = projects.filter(
				(project) =>
					(selectedCategory === 'all' || project.category === selectedCategory) &&
					(selectedYear === 'all' || project.year === selectedYear) &&
					(showArchived || !project.archived)
			);
		}
	}

	onMount(() => {
		filterProjects();
	});
</script>

<span class="projects-title">
	<h2>Projects</h2>
	<span class="projects-count">{displayedProjects.length} items</span>
</span>

<div class="filters">
	<span class="filters-selects">
		<label for="category"
			>Category
			<select bind:value={selectedCategory} onchange={filterProjects}>
				<option value="all">All</option>
				{#each categories as category}
					<option value={category}
						>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</option
					>
				{/each}
			</select>
		</label>

		<label for="year"
			>Year
			<select bind:value={selectedYear} onchange={filterProjects}>
				<option value="all">All</option>
				{#each years as year}
					<option value={year}>{year}</option>
				{/each}
			</select>
		</label>
	</span>

	<label for="archived">
		Show Archived
		<input type="checkbox" bind:checked={showArchived} onchange={filterProjects} />
	</label>
</div>

<div class="projects-container">
	{#each displayedProjects as project}
		<ProjectCard {project} />
	{/each}
</div>

<style>
	.projects-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}
	.projects-count {
		font-size: 14px;
		color: rgba(from var(--brand-grey) r g b / 0.7);
		font-family: var(--mono-font);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	h2 {
		margin: 0;
		margin-bottom: 1rem;
	}
	.projects-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(380px, 100%), 1fr));
		gap: 1rem;
	}
	.filters {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		justify-content: space-between;

		.filters-selects {
			display: flex;
			gap: 1rem;
			align-items: end;
		}

		label {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			color: rgba(from var(--brand-grey) r g b / 0.7);
			font-size: 10px;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			font-family: var(--mono-font);

			&[for='archived'] {
				align-items: flex-end;
				text-align: right;
			}
		}
	}
</style>
