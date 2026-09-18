export type Game = {
	id: string;
	url: string;
	aspectRatio: number;
	type: 'godot';
};

export const games: Game[] = [
	{
		id: 'Starfish',
		url: 'https://nickesc.io/projectStarfish/index.html',
		aspectRatio: 2 / 1,
		type: 'godot'
	}
];
