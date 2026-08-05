export const backgrounds = [
	//'chalk-slate',
	'radar',
	'lidar',
	'sonar'
] as const;

export type Background = (typeof backgrounds)[number];
