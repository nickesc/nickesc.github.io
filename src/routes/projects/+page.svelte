<script lang="ts">
	import { projects } from '$lib/projects';

	let displayedProjects = $state(projects);
	let selectedCategory = $state('all');
	let selectedYear: number | 'all' = $state<number | 'all'>('all');

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

<select bind:value={selectedCategory} onchange={filterProjects}>
	<option value="all">All</option>
	{#each categories as category}
		<option value={category}
			>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</option
		>
	{/each}
</select>

<select bind:value={selectedYear} onchange={filterProjects}>
	<option value="all">All</option>
	{#each years as year}
		<option value={year}>{year}</option>
	{/each}
</select>

<div class="projects-container">
	{#each displayedProjects as project}
		<div class="project-container">
			<div class="project-logo-container" style:background-color={project.background}>
				<img class="project-logo" src={project.imgUrl} alt={project.name} />
			</div>

			<h3 class="project-name">{project.name}</h3>
			<p class="project-description">{project.description}</p>
			<a class="project-url" href={project.projectUrl} target="_blank">View Project</a>
			<a class="project-source-url" href={project.sourceUrl} target="_blank">View Source</a>
		</div>
	{/each}
</div>

<style>
	.projects-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: 1rem;
	}

	.project-logo-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.project-logo {
		max-width: 300px;
		width: 100%;
	}
</style>
