import { writable } from 'svelte/store';

export const tasks = writable([]);
export const currentTask = writable(null);
