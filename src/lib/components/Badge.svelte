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

	type Badge = {
		icon: typeof SiHtml5;
		color: string;
		url: string;
		title: string;
		text: string;
		categories: ('tech' | 'distribution' | 'social')[];
	};

	export const badges: Record<string, Badge> = {
		html: {
			icon: SiHtml5,
			color: 'rgb(228,77,38)',
			url: 'https://html.spec.whatwg.org/multipage/',
			title: 'HTML',
			text: 'HTML',
			categories: ['tech']
		},
		css: {
			icon: SiCss,
			color: 'rgb(21,114,182)',
			url: 'https://www.w3.org/Style/CSS/',
			title: 'CSS',
			text: 'CSS',
			categories: ['tech']
		},
		javascript: {
			icon: SiJavascript,
			color: 'rgb(240,219,79)',
			url: 'https://262.ecma-international.org/',
			title: 'JavaScript',
			text: 'JavaScript',
			categories: ['tech']
		},
		typescript: {
			icon: SiTypescript,
			color: 'rgb(49,120,198)',
			url: 'https://www.typescriptlang.org/',
			title: 'TypeScript',
			text: 'TypeScript',
			categories: ['tech']
		},
		react: {
			icon: SiReact,
			color: 'rgb(62,182,214)',
			url: 'https://react.dev/',
			title: 'React',
			text: 'React',
			categories: ['tech']
		},
		svelte: {
			icon: SiSvelte,
			color: 'rgb(255,62,0)',
			url: 'https://svelte.dev/',
			title: 'Svelte',
			text: 'Svelte',
			categories: ['tech']
		},
		node: {
			icon: SiNodedotjs,
			color: 'rgb(51,153,51)',
			url: 'https://nodejs.org/',
			title: 'Node.js',
			text: 'Node.js',
			categories: ['tech']
		},
		python: {
			icon: SiPython,
			color: 'rgb(48,105,152)',
			url: 'https://www.python.org/',
			title: 'Python',
			text: 'Python',
			categories: ['tech']
		},
		zsh: {
			icon: SiZsh,
			color: 'rgb(153,153,153)',
			url: 'https://zsh.sourceforge.io/',
			title: 'Zsh',
			text: 'Zsh',
			categories: ['tech']
		},
		godotengine: {
			icon: SiGodotengine,
			color: 'rgb(71,140,191)',
			url: 'https://godotengine.org/',
			title: 'Godot',
			text: 'Godot',
			categories: ['tech']
		},
		git: {
			icon: SiGit,
			color: 'rgb(240, 60, 46)',
			url: 'https://git-scm.com/',
			title: 'Git',
			text: 'Git',
			categories: ['tech']
		},
		bluesky: {
			icon: SiBluesky,
			color: 'rgb(17,133,254)',
			url: 'https://bsky.app/profile/nickesc.io',
			title: 'Bluesky',
			text: '@nickesc.io',
			categories: ['social']
		},
		github: {
			icon: SiGithub,
			color: 'rgb(245,245,243)',
			url: 'https://github.com/nickesc',
			title: 'GitHub',
			text: 'nickesc',
			categories: ['social', 'distribution']
		},
		'infosec-exchange': {
			icon: InfosecExchange,
			color: 'rgb(236,28,36)',
			url: 'https://infosec.exchange/@nickesc',
			title: 'Mastodon (Infosec.Exchange)',
			text: '@nickesc@infosec.exchange',
			categories: ['social']
		},
		kofi: {
			icon: SiKofi,
			color: 'rgb(255,100,51)',
			url: 'https://ko-fi.com/nickesc',
			title: 'Ko-Fi',
			text: 'nickesc',
			categories: ['social']
		},
		linkedin: {
			icon: Linkedin,
			color: 'rgb(0,119,181)',
			url: 'https://linkedin.com/in/nickesc/',
			title: 'LinkedIn',
			text: 'nickesc',
			categories: ['social']
		},
		youtube: {
			icon: SiYoutube,
			color: 'rgb(255,0,0)',
			url: 'https://youtube.com/@nickesc_',
			title: 'YouTube',
			text: '@nickesc_',
			categories: ['social']
		},
		'open-vsx': {
			icon: OpenVsx,
			color: 'rgb(165, 15, 230)',
			url: 'https://open-vsx.org/namespace/nickesc',
			title: 'Open VSX',
			text: 'Open VSX',
			categories: ['distribution']
		},
		'vs-mp': {
			icon: VsMp,
			color: 'rgb(0, 122, 204)',
			url: 'https://marketplace.visualstudio.com/publishers/nickesc',
			title: 'VS Marketplace',
			text: 'VS Marketplace',
			categories: ['distribution']
		},
		npm: {
			icon: SiNpm,
			color: 'rgb(204,51,51)',
			url: 'https://npmjs.com/org/nickesc',
			title: 'npm',
			text: 'npm',
			categories: ['distribution']
		},
		firefox: {
			icon: SiFirefox,
			color: 'rgb(255,113,57)',
			url: 'https://addons.mozilla.org/en-US/firefox/user/18835687/',
			title: 'Firefox Add-ons',
			text: 'Firefox Add-ons',
			categories: ['distribution']
		},
		itchio: {
			icon: SiItchdotio,
			color: 'rgb(250,92,92)',
			url: 'https://nickesc.itch.io/',
			title: 'itch.io',
			text: 'itch.io',
			categories: ['distribution']
		},
		modrinth: {
			icon: SiModrinth,
			color: 'rgb(27, 218, 106)',
			url: 'https://modrinth.com/user/nickesc',
			title: 'Modrinth',
			text: 'Modrinth',
			categories: ['distribution']
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
