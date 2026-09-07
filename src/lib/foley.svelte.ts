import { browser } from '$app/environment';
import {
	bind,
	play as playFoley,
	set,
	type CueName,
	type PlayHandle,
	type PlayOptions
} from '@foleyjs/core';
//import { physicalSoundSet } from '$lib/foleySoundSet';

const MUTED_STORAGE_KEY = 'nickesc:foley-muted';
const TYPE_VOLUME = 0.4;

let initialized = false;
let muteTimer: ReturnType<typeof setTimeout> | undefined;
let muted = $state(false);

function saveMutedPreference() {
	try {
		localStorage.setItem(MUTED_STORAGE_KEY, String(muted));
	} catch {
		// Sound stays usable when storage is unavailable.
	}
}

function init() {
	if (!browser || initialized) return;

	initialized = true;

	try {
		muted = localStorage.getItem(MUTED_STORAGE_KEY) === 'true';
	} catch {
		muted = false;
	}

	set({
		hover: false,
		muted,
		space: 0.04,
		theme: 'mechanical',
		volume: 0.35
	});
	bind();
}

function play(name: CueName, options?: PlayOptions): PlayHandle | undefined {
	if (!browser || muted) return;

	try {
		return playFoley(name, options);
	} catch {
		return undefined;
	}
}

function playType() {
	return play('thock', {
		volume: TYPE_VOLUME,
		pitch: Math.random() * 2 - 1
	});
}

function toggleMuted() {
	if (!browser) return;

	if (muteTimer) {
		clearTimeout(muteTimer);
		muteTimer = undefined;
	}

	if (muted) {
		muted = false;
		set({ muted: false });
		play('switch');
	} else {
		play('latch');
		muted = true;
		muteTimer = setTimeout(() => {
			set({ muted: true });
			muteTimer = undefined;
		}, 220);
	}

	saveMutedPreference();
}

export const foley = {
	get muted() {
		return muted;
	},
	init,
	play,
	playType,
	toggleMuted
};
