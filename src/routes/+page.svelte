<script lang="ts">
	import { projects } from '$lib/projects';

	import Badge from '$lib/components/Badge.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let displayedProjects = $state(projects);
	displayedProjects = projects.filter((project) => project.featured === true);
</script>

<p style:margin-top="0">Hi, I'm</p>
<div class="title-background">
	<h1>Nick Escobar</h1>
</div>
<p>I'm a software developer and artist. I mostly work on web stuff, developer tools, and games.</p>
<h2>Check out some of my favorite projects:</h2>

<div class="featured-projects-container">
	{#each displayedProjects as project}
		<ProjectCard {project} featured={true} />
	{/each}
</div>

<h2>About me</h2>
<p>2 things I love: open source software and learning new things</p>

<p>School</p>
<ul>
	<li>
		<span>Occidental College</span> <span>B.A. in Computer Science</span>
		<span>Minor in Media studies</span> <span>Minor in Fine Art</span> <span>2018-2022</span>
	</li>
</ul>
<p>Hobbies</p>
<ul>
	<li>video games</li>
	<li>movies</li>
	<li>collecting physical media</li>
	<li>hiking</li>
	<li>camping</li>
</ul>
<p>Tech</p>
<ul class="badges">
	<li>
		<Badge
			icon="html"
			text="HTML"
			href="https://html.spec.whatwg.org/multipage/"
			bgColor="rgb(228,77,38)"
		/>
	</li>
	<li>
		<Badge icon="css" text="CSS" href="https://www.w3.org/Style/CSS/" bgColor="rgb(21,114,182)" />
	</li>
	<li>
		<Badge
			icon="javascript"
			text="JavaScript"
			href="https://262.ecma-international.org/"
			bgColor="rgb(240,219,79)"
		/>
	</li>
	<li>
		<Badge
			icon="typescript"
			text="TypeScript"
			href="https://www.typescriptlang.org/"
			bgColor="rgb(49,120,198)"
		/>
	</li>
	<li>
		<Badge icon="node" text="Node.js" href="https://nodejs.org/" bgColor="rgb(51,153,51)" />
	</li>
	<li>
		<Badge icon="react" text="React" href="https://react.dev/" bgColor="rgb(62,182,214)" />
	</li>
	<li>
		<Badge icon="svelte" text="Svelte" href="https://svelte.dev/" bgColor="rgb(255,62,0)" />
	</li>
	<li>
		<Badge icon="python" text="Python" href="https://www.python.org/" bgColor="rgb(48,105,152)" />
	</li>
	<li>
		<Badge icon="zsh" text="Zsh" href="https://zsh.sourceforge.io/" bgColor="rgb(153,153,153)" />
	</li>
	<li>
		<Badge
			icon="godotengine"
			text="Godot"
			href="https://godotengine.org/"
			bgColor="rgb(71,140,191)"
		/>
	</li>
</ul>

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

	.badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
