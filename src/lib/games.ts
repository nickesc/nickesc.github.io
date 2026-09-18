import { projects } from '$lib/projects';

export type Game = {
	id: string;
	description: string;
	artUrl: string;
	color: string;
	year: number;
	url: string;
	fallbackUrl: string;
	aspectRatio: number;
	type: 'godot';
};

const starfishProject = projects.find((project) => project.name === 'Starfish');

if (!starfishProject) {
	throw new Error('Starfish project data is missing.');
}

export const games: Game[] = [
	{
		id: starfishProject.name,
		description: starfishProject.description,
		artUrl: starfishProject.imgUrl,
		color: starfishProject.background,
		year: starfishProject.year,
		url: 'https://nickesc.io/projectStarfish/index.html',
		fallbackUrl: 'https://nickesc.io/projectStarfish/index.html',
		aspectRatio: 2 / 1,
		type: 'godot'
	}
];
