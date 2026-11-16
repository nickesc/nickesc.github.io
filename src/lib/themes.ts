export const backgrounds = ['radar', 'lidar', 'sonar'] as const;

export type Background = (typeof backgrounds)[number];
