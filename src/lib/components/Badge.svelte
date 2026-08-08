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
	import InfosecExchange from '$lib/components/icons/infosec-exchange.svelte';
	import Linkedin from '$lib/components/icons/linkedin.svelte';
	import OpenVsx from '$lib/components/icons/open-vsx.svelte';
	import Sig from '$lib/components/icons/sig.svelte';
	import VsMp from '$lib/components/icons/vs-mp.svelte';

	const icons = {
		html: SiHtml5,
		css: SiCss,
		javascript: SiJavascript,
		typescript: SiTypescript,
		react: SiReact,
		svelte: SiSvelte,
		node: SiNodedotjs,
		python: SiPython,
		zsh: SiZsh,
		godotengine: SiGodotengine,
		bluesky: SiBluesky,
		github: SiGithub,
		'infosec-exchange': InfosecExchange,
		kofi: SiKofi,
		linkedin: Linkedin,
		'open-vsx': OpenVsx,
		sig: Sig,
		'vs-mp': VsMp,
		youtube: SiYoutube,
		npm: SiNpm,
		firefox: SiFirefox,
		itchio: SiItchdotio,
		modrinth: SiModrinth
	} as const;

	interface Props {
		icon: keyof typeof icons;
		text: string;
		href: string;
		bgColor: string;
	}

	let { icon, text, href, bgColor }: Props = $props();

	const Icon = $derived(icons[icon]);
</script>

<a {href} style:--logo-color={bgColor} style:color={bgColor} target="_blank">
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
