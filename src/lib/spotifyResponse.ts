export type SpotifyResponse = {
	playing: boolean;
	device?: { name: string; type: string };
	player?: {
		vol: number;
		shuffle: boolean;
		repeat: 'off' | 'track' | 'context';
		progress: number;
	};
	track?: {
		context: {
			name: string;
			type: string;
			url: string;
		} | null;
		artists: {
			names: string[];
			url: string;
		};
		contentType: 'track' | 'episode';
		name: string;
		image: string;
		explicit: boolean;
		url: string;
		duration: number;
	};
};
