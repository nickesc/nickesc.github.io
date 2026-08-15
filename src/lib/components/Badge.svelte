<script lang="ts">
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
	import SiBluesky from '@icons-pack/svelte-simple-icons/icons/SiBluesky';
	import SiGithub from '@icons-pack/svelte-simple-icons/icons/SiGithub';
	import SiKofi from '@icons-pack/svelte-simple-icons/icons/SiKofi';
	import SiYoutube from '@icons-pack/svelte-simple-icons/icons/SiYoutube';
	import SiNpm from '@icons-pack/svelte-simple-icons/icons/SiNpm';
	import SiFirefox from '@icons-pack/svelte-simple-icons/icons/SiFirefox';
	import SiItchdotio from '@icons-pack/svelte-simple-icons/icons/SiItchdotio';
	import SiModrinth from '@icons-pack/svelte-simple-icons/icons/SiModrinth';
	import SiGit from '@icons-pack/svelte-simple-icons/icons/SiGit';
	import InfosecExchange from '$lib/components/icons/infosec-exchange.svelte';
	import Linkedin from '$lib/components/icons/linkedin.svelte';
	import OpenVsx from '$lib/components/icons/open-vsx.svelte';
	import VsMp from '$lib/components/icons/vs-mp.svelte';

	export const badges = {
		html: {
			icon: SiHtml5,
			color: 'rgb(228,77,38)',
			url: 'https://html.spec.whatwg.org/multipage/',
			title: 'HTML',
			text: 'HTML'
		},
		css: {
			icon: SiCss,
			color: 'rgb(21,114,182)',
			url: 'https://www.w3.org/Style/CSS/',
			title: 'CSS',
			text: 'CSS'
		},
		javascript: {
			icon: SiJavascript,
			color: 'rgb(240,219,79)',
			url: 'https://262.ecma-international.org/',
			title: 'JavaScript',
			text: 'JavaScript'
		},
		typescript: {
			icon: SiTypescript,
			color: 'rgb(49,120,198)',
			url: 'https://www.typescriptlang.org/',
			title: 'TypeScript',
			text: 'TypeScript'
		},
		react: {
			icon: SiReact,
			color: 'rgb(62,182,214)',
			url: 'https://react.dev/',
			title: 'React',
			text: 'React'
		},
		svelte: {
			icon: SiSvelte,
			color: 'rgb(255,62,0)',
			url: 'https://svelte.dev/',
			title: 'Svelte',
			text: 'Svelte'
		},
		node: {
			icon: SiNodedotjs,
			color: 'rgb(51,153,51)',
			url: 'https://nodejs.org/',
			title: 'Node.js',
			text: 'Node.js'
		},
		python: {
			icon: SiPython,
			color: 'rgb(48,105,152)',
			url: 'https://www.python.org/',
			title: 'Python',
			text: 'Python'
		},
		zsh: {
			icon: SiZsh,
			color: 'rgb(153,153,153)',
			url: 'https://zsh.sourceforge.io/',
			title: 'Zsh',
			text: 'Zsh'
		},
		godotengine: {
			icon: SiGodotengine,
			color: 'rgb(71,140,191)',
			url: 'https://godotengine.org/',
			title: 'Godot',
			text: 'Godot'
		},
		bluesky: {
			icon: SiBluesky,
			color: 'rgb(17,133,254)',
			url: 'https://bsky.app/',
			title: 'Bluesky',
			text: 'Bluesky'
		},
		github: {
			icon: SiGithub,
			color: 'rgb(245,245,243)',
			url: 'https://github.com/',
			title: 'GitHub',
			text: 'GitHub'
		},
		'infosec-exchange': {
			icon: InfosecExchange,
			color: 'rgb(236,28,36)',
			url: 'https://infosec.exchange/',
			title: 'Mastodon (Infosec.Exchange)',
			text: 'Infosec.Exchange'
		},
		kofi: {
			icon: SiKofi,
			color: 'rgb(255,100,51)',
			url: 'https://ko-fi.com/',
			title: 'Ko-Fi',
			text: 'Ko-Fi'
		},
		linkedin: {
			icon: Linkedin,
			color: 'rgb(0,119,181)',
			url: 'https://linkedin.com/',
			title: 'LinkedIn',
			text: 'LinkedIn'
		},
		'open-vsx': {
			icon: OpenVsx,
			color: 'rgb(165, 15, 230)',
			url: 'https://open-vsx.org/',
			title: 'Open VSX',
			text: 'Open VSX'
		},
		'vs-mp': {
			icon: VsMp,
			color: 'rgb(0, 122, 204)',
			url: 'https://marketplace.visualstudio.com/',
			title: 'VS Marketplace',
			text: 'VS Marketplace'
		},
		youtube: {
			icon: SiYoutube,
			color: 'rgb(255,0,0)',
			url: 'https://youtube.com/',
			title: 'YouTube',
			text: 'YouTube'
		},
		npm: {
			icon: SiNpm,
			color: 'rgb(204,51,51)',
			url: 'https://npmjs.com/',
			title: 'npm',
			text: 'npm'
		},
		firefox: {
			icon: SiFirefox,
			color: 'rgb(255,113,57)',
			url: 'https://addons.mozilla.org/',
			title: 'Firefox Add-ons',
			text: 'Firefox Add-ons'
		},
		itchio: {
			icon: SiItchdotio,
			color: 'rgb(250,92,92)',
			url: 'https://itch.io/',
			title: 'itch.io',
			text: 'itch.io'
		},
		modrinth: {
			icon: SiModrinth,
			color: 'rgb(27, 218, 106)',
			url: 'https://modrinth.com/',
			title: 'Modrinth',
			text: 'Modrinth'
		},
		git: {
			icon: SiGit,
			color: 'rgb(240, 60, 46)',
			url: 'https://git-scm.com/',
			title: 'Git',
			text: 'Git'
		}
	} as const;

	interface Props {
		icon: keyof typeof badges;
		text?: string;
		href?: string;
		bgColor?: string;
	}

	let {
		icon,
		text = badges[icon].text,
		href = badges[icon].url,
		bgColor = badges[icon].color
	}: Props = $props();

	const Icon = $derived(badges[icon].icon);
</script>

<a
	{href}
	style:--logo-color={bgColor}
	style:color={bgColor}
	title={badges[icon].title}
	rel="noopener noreferrer"
	target="_blank"
>
	<Icon class="icon" title={text} color={bgColor} />

	{text}
</a>

<style>
	a {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		white-space: nowrap;
		text-decoration: none;
		padding: 0.25rem 0.5rem;
		border-radius: var(--corners);
		background-color: rgba(from var(--logo-color) r g b / 0.25);
		border: 1.5px solid transparent;
		transition:
			background-color 0.2s ease-in-out,
			border 0.2s ease-in-out;

		&:hover {
			background-color: rgba(from var(--logo-color) r g b / 0.5);
		}

		&:active {
			background-color: rgba(from var(--logo-color) r g b / 0.75);
			border-color: var(--logo-color);
		}
	}

	a :global(.icon) {
		flex-shrink: 0;
	}
</style>
