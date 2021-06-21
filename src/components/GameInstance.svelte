<script>
    import { fade } from 'svelte/transition';
    import TargetWrapper from './TargetWrapper.svelte';

    let seconds = 0;

    let mousecoords = { x: 0, y: 0};

    function handleMouseMove(event) {
        mousecoords.x = event.clientX;
        mousecoords.y = event.clientY;
    }
</script>

<div id="wrapper" on:mousemove={handleMouseMove}>
    <p id="mouse_coords" >{mousecoords.x}, {mousecoords.y}</p>
    <p class="centered end" transition:fade={{duration: 200}}>Press "ESC" to end game.</p>
    <p id="timer">{seconds}</p>
    <TargetWrapper bind:seconds={seconds}/>
</div>

<style>

    #wrapper {
        height: 100%;
        width: 100%;
    }

    #mouse_coords {
        position: absolute;
        top: 0;
        right: 0;
        color: var(--color-accent);
    }

    #timer {
        color: var(--color-accent);
    }
    
    .end {
        color: var(--color-transBlack);
        font-size: 5em;
    }


</style>