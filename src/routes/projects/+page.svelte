<script lang="ts">
	import { projects, type Category, type Tech } from '$lib/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let selectedCategory = $state<Category | 'all'>('all');
	let selectedTech = $state<Tech | 'all'>('all');
	let selectedYear: number | 'all' = $state<number | 'all'>('all');
	let showArchived = $state(false);

	const years: number[] = $derived(Array.from(new Set(projects.map((project) => project.year))));
	const categories: Category[] = $derived(
		Array.from(new Set(projects.flatMap((project) => project.categories))).sort((a, b) => {
			if (a === 'other') return 1;
			if (b === 'other') return -1;
			return a.localeCompare(b);
		})
	);
	const techOptions: Tech[] = $derived(
		Array.from(new Set(projects.flatMap((project) => project.tech))).sort((a, b) => {
			if (a === 'Other') return 1;
			if (b === 'Other') return -1;
			return a.localeCompare(b);
		})
	);

	function longestLength(labels: string[]) {
		return Math.max(0, ...labels.map((label) => label.length));
	}

	const widestCategory = $derived(
		longestLength([
			'All',
			...categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase())
		])
	);
	const widestTech = $derived(longestLength(['All', ...techOptions]));
	const widestYear = $derived(longestLength(['All', ...years.map(String)]));

	const displayedProjects = $derived(
		selectedCategory === 'all' && selectedTech === 'all' && selectedYear === 'all' && showArchived
			? projects
			: projects.filter(
					(project) =>
						(selectedCategory === 'all' || project.categories.includes(selectedCategory)) &&
						(selectedTech === 'all' || project.tech.includes(selectedTech)) &&
						(selectedYear === 'all' || project.year === selectedYear) &&
						(showArchived || !project.archived)
				)
	);
</script>

<svelte:head>
	<title>Projects | Nick Escobar</title>
	<meta
		name="description"
		content="Explore websites, developer tools, games, packages, and other creative projects built by Nick Escobar."
	/>
	<link rel="canonical" href="https://nickesc.github.io/projects" />

	<meta property="og:title" content="Projects | Nick Escobar" />
	<meta
		property="og:description"
		content="Explore websites, developer tools, games, packages, and other creative projects built by Nick Escobar."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nickesc.github.io/projects" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Projects | Nick Escobar" />
	<meta
		name="twitter:description"
		content="Explore websites, developer tools, games, packages, and other creative projects built by Nick Escobar."
	/>
</svelte:head>

<span class="projects-title">
	<h2>Projects</h2>
	<span class="projects-count">{displayedProjects.length} items</span>
</span>

<div class="filters">
	<span class="filters-selects">
		<label for="category"
			>Category
			<span class="select-container" data-widest={widestCategory}>
				<select bind:value={selectedCategory}>
					<option value="all">All</option>
					{#each categories as category}
						<option value={category}
							>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</option
						>
					{/each}
				</select>
			</span>
		</label>

		<label for="tech"
			>Tech
			<span class="select-container" data-widest={widestTech}>
				<select bind:value={selectedTech}>
					<option value="all">All</option>
					{#each techOptions as tech}
						<option value={tech}>{tech}</option>
					{/each}
				</select>
			</span>
		</label>

		<label for="year"
			>Year
			<span class="select-container" data-widest={widestYear}>
				<select bind:value={selectedYear}>
					<option value="all">All</option>
					{#each years as year}
						<option value={year}>{year}</option>
					{/each}
				</select>
			</span>
		</label>
	</span>

	<label for="archived">
		Show Archived
		<input type="checkbox" bind:checked={showArchived} />
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
		align-items: flex-end;

		.filters-selects {
			display: flex;
			flex: 1 1 auto;
			flex-wrap: wrap;
			gap: 1rem;
			align-items: end;
			min-width: 0;
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
