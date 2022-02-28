import { writable } from 'svelte/store';
import type { Wave } from '$lib/types/Wave';

export const WaveStore = writable<Wave[]>([]);