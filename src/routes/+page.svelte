<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';

	import SiHtml5 from '@icons-pack/svelte-simple-icons/icons/SiHtml5';
	import SiCss from '@icons-pack/svelte-simple-icons/icons/SiCss';
	import SiJavascript from '@icons-pack/svelte-simple-icons/icons/SiJavascript';
	import SiTypescript from '@icons-pack/svelte-simple-icons/icons/SiTypescript';
	import SiReact from '@icons-pack/svelte-simple-icons/icons/SiReact';
	import SiSvelte from '@icons-pack/svelte-simple-icons/icons/SiSvelte';
	import SiNodedotjs from '@icons-pack/svelte-simple-icons/icons/SiNodedotjs';
	import SiPython from '@icons-pack/svelte-simple-icons/icons/SiPython';
	import SiZsh from '@icons-pack/svelte-simple-icons/icons/SiZsh';
	import SiGodotengine from '@icons-pack/svelte-simple-icons/icons/SiGodotengine';

	let displayedProjects = $state(projects);
	displayedProjects = projects.filter((project) => project.featured === true);
</script>

<p>Hi, I'm</p>
<div class="background">
	<h1>Nick Escobar</h1>
</div>

<p>I'm a software engineer.</p>
<p>Tech</p>
<ul class="badges">
	<li>
		<Badge
			icon={SiHtml5}
			text="HTML"
			href="https://html.spec.whatwg.org/multipage/"
			bgColor="#E44D26"
		/>
	</li>
	<li><Badge icon={SiCss} text="CSS" href="https://www.w3.org/Style/CSS/" bgColor="#1572B6" /></li>
	<li>
		<Badge
			icon={SiTypescript}
			text="TypeScript"
			href="https://www.typescriptlang.org/"
			bgColor="#3178C6"
		/>
	</li>
	<li>
		<Badge
			icon={SiJavascript}
			text="JavaScript"
			href="https://262.ecma-international.org/"
			bgColor="#f0db4f"
			textColor="dark"
		/>
	</li>
	<li><Badge icon={SiNodedotjs} text="Node.js" href="https://nodejs.org/" bgColor="#339933" /></li>
	<li><Badge icon={SiReact} text="React" href="https://react.dev/" bgColor="#3eb6d6" /></li>
	<li><Badge icon={SiSvelte} text="Svelte" href="https://svelte.dev/" bgColor="#FF3E00" /></li>
	<li><Badge icon={SiPython} text="Python" href="https://www.python.org/" bgColor="#306998" /></li>
	<li><Badge icon={SiZsh} text="Zsh" href="https://zsh.sourceforge.io/" bgColor="#222" /></li>
	<li>
		<Badge icon={SiGodotengine} text="Godot" href="https://godotengine.org/" bgColor="#478CBF" />
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

	.background {
		background-color: rgba(from var(--brand-accent) r g b / 0.85);
		width: fit-content;
		padding: 0.5rem 1rem;
		border-radius: var(--corners);
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
