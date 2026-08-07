<script lang="ts">
	import { projects } from '$lib/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let displayedProjects = $state(projects);
	let selectedCategory = $state('all');
	let selectedYear: number | 'all' = $state<number | 'all'>('all');

	let delay = 0;

	const years: number[] = $derived(Array.from(new Set(projects.map((project) => project.year))));
	const categories: string[] = $derived(
		Array.from(new Set(projects.map((project) => project.category)))
	);

	function filterProjects() {
		if (selectedCategory === 'all' && selectedYear === 'all') {
			displayedProjects = projects;
		} else {
			displayedProjects = projects.filter(
				(project) =>
					(selectedCategory === 'all' || project.category === selectedCategory) &&
					(selectedYear === 'all' || project.year === selectedYear)
			);
		}
	}
</script>

<h2>Projects</h2>

<div class="filters">
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
</div>

<div class="projects-container">
	{#each displayedProjects as project}
		<ProjectCard {project} />
	{/each}
</div>

<style>
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

		label {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			color: rgba(from var(--brand-grey) r g b / 0.7);
			font-size: 10px;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			font-family: var(--mono-font);

			.required {
				color: rgba(199, 32, 66, 0.8);
			}
		}
	}
</style>
