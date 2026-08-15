<script lang="ts">
	import { projects } from '$lib/projects';

	import Badge from '$lib/components/Badge.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let displayedProjects = $state(projects);
	displayedProjects = projects.filter((project) => project.featured === true);
</script>

<svelte:head>
	<title>Nick Escobar</title>
	<meta
		name="description"
		content="Nick Escobar is a software developer and artist creating websites, developer tools, games, and other open-source projects."
	/>
	<link rel="canonical" href="https://nickesc.github.io/" />

	<meta property="og:title" content="Nick Escobar" />
	<meta
		property="og:description"
		content="Nick Escobar is a software developer and artist creating websites, developer tools, games, and other open-source projects."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nickesc.github.io/" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Nick Escobar" />
	<meta
		name="twitter:description"
		content="Nick Escobar is a software developer and artist creating websites, developer tools, games, and other open-source projects."
	/>
</svelte:head>

<p style:margin-top="0">Hi, I'm</p>
<div class="title-background">
	<h1>Nick Escobar</h1>
</div>
<p>I'm a software developer and artist. I mostly work on web stuff, developer tools, and games.</p>

<h2>Some of my favorite projects:</h2>

<div class="featured-projects-container">
	{#each displayedProjects as project}
		<ProjectCard {project} featured={true} />
	{/each}
</div>

<h2>About me</h2>

<div class="about">
	<p class="lead">
		I'm a passionate developer with a love for open source and learning new things. My background in
		art informs my work, and I build things that are both functional and beautiful.
	</p>
	<p>
		As a student, I studied computer science at Occidental College, with minors in studio art and
		media studies. Today, I run a small, independent studio, <a
			href="https://nescobar.media"
			target="_blank"
			rel="noopener noreferrer">N. Escobar Media</a
		>, that provides web development services and technical support for small teams.
	</p>
	<p>
		My hobbies include playing video games, watching movies, hiking, camping, and collecting
		physical media.
	</p>

	<div class="tech">
		<span class="tech-label">Go-to tech</span>
		<ul class="badges">
			<li>
				<Badge icon="typescript" />
			</li>
			<li>
				<Badge icon="node" />
			</li>
			<li>
				<Badge icon="svelte" />
			</li>
			<li>
				<Badge icon="python" />
			</li>
			<li>
				<Badge icon="godotengine" />
			</li>
			<li>
				<Badge icon="git" />
			</li>
		</ul>
	</div>
</div>

<style>
	h1 {
		font-size: 3rem;
		font-weight: 700;
		color: var(--brand-white);
		text-align: center;
		margin: 0;
		padding: 0;
	}

	.title-background {
		background-color: rgba(from var(--brand-accent) r g b / 0.85);
		width: fit-content;
		padding: 0.5rem 1rem;
		border-radius: var(--corners);
		margin: 0.75rem 0;
	}

	.featured-projects-container {
		--project-color: rgba(from var(--brand-accent) r g b / 0.9);
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
		margin: 0 auto;
	}

	.about {
		padding: 1.25rem 1.5rem;
		margin-bottom: 1rem;
		border-radius: var(--window-corners);
		border: 1px solid rgba(from var(--brand-grey) r g b / 0.2);
		border-right-color: rgba(from var(--brand-grey) r g b / 0.1);
		border-bottom-color: rgba(from var(--brand-grey) r g b / 0.1);
		background: rgba(from var(--brand-black) r g b / 0.5);

		@media (max-width: 600px) {
			padding: 1rem;
		}

		p {
			margin: 0 0 1rem;
			line-height: 1.6;
			color: rgba(from var(--brand-white) r g b / 0.85);
		}

		.lead {
			font-size: 1.125rem;
			color: var(--brand-white);
		}
	}

	.tech {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1.5rem;
		padding-top: 1.25rem;
		border-top: 1px solid rgba(from var(--brand-grey) r g b / 0.15);
	}

	.tech-label {
		font-family: var(--mono-font);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: rgba(from var(--brand-grey) r g b / 0.7);
	}

	.badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
