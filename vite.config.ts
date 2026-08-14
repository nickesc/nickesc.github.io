import { mdsvex } from 'mdsvex';
import rehypeExternalLinks from 'rehype-external-links';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { version } from './package.json' with { type: 'json' };

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: true
			}),
			preprocess: [
				mdsvex({
					extensions: ['.svx', '.md'],
					rehypePlugins: [
						[
							rehypeExternalLinks,
							{
								target: '_blank',
								rel: ['noopener', 'noreferrer']
							}
						]
					]
				})
			],
			extensions: ['.svelte', '.svx', '.md']
		})
	],
	define: { __APP_VERSION__: JSON.stringify(version) },
	ssr: { noExternal: ['@icons-pack/svelte-simple-icons'] }
});
