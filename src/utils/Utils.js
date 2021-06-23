import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {
	const interval = setInterval(callback, milliseconds);

	onDestroy(() => {
		clearInterval(interval);
	});
}

export const getCoord = (max, targetSize) => {
    let coord = Math.floor(Math.random() * max);
    if (coord + targetSize > max) {
        coord -= targetSize + 10;
    } else if (coord - targetSize < 0) {
        coord += targetSize + 10;
    } else {
        return coord;
    }
}