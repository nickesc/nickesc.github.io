export type Game = {
	name: string;
	url: string;
	aspectRatio: number;
	type: 'godot';
};

export const games: Game[] = [
	{
		name: 'Starfish',
		url: 'https://nickesc.io/projectStarfish/index.html',
		aspectRatio: 2 / 1,
		type: 'godot'
	}
];
