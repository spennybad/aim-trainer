<script>

    // Store Imports 
    import { Targets } from '../stores/TargetsStore.js';
    import { TotalScore } from '../stores/TotalScore.js';
    import { Hits } from '../stores/HitsStore.js';
    import { Misses } from '../stores/MissesStore.js';

    import { fade } from 'svelte/transition';

    // Config Imports
    import FurryConfig from '../utils/FurryConfig';

    import TargetWrapper from './TargetWrapper.svelte';
    import { onInterval } from '../utils/Utils.js';
    import { onDestroy } from 'svelte';

    let time = 0;

    let mousecoords = { x: 0, y: 0};

    function handleMouseMove(event) {
        mousecoords.x = event.clientX;
        mousecoords.y = event.clientY;
    }

    // Time tracker... every millisecond. Used to sync all app actions.
    onInterval(() => {
        time += 100;
    }, 100)

    onDestroy(() => {
        Targets.set({});
        Hits.set(0);
        Misses.set(0);
    })

</script>

<div id="wrapper" on:mousemove={handleMouseMove} transition:fade={{duration: 200}}>
    <div id="hud_wrapper">
        <p class="end">Press "ESC" to end game.</p>
        <p id="timer"><span>Time = </span>{Math.floor(time/1000)}</p>
        <div class="centered score">{$TotalScore}</div>
        <p id="mouse_coords">{mousecoords.x}, {mousecoords.y}</p>
    </div>
    <!-- To have logic added around for passing specific configs based on what gamemode is active. -->
    <TargetWrapper bind:time={time} config={FurryConfig.config}/>
</div>

<style>

    #wrapper {
        position: relative;
        height: 100%;
        display: grid;
        grid-template-rows: min-content 1fr;
    }

    #hud_wrapper {
        display: grid;
        height: min-content;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        padding: 1rem;
    }

    #mouse_coords {
        top: 0;
        right: 0;
        color: var(--color-accent);
        justify-self: right;
    }

    #timer {
        color: var(--color-accent);
    }

    #timer span {
        margin-right: .2em;
        color: black;
    }

    .score {
        font-size: 70vh;
        color: var(--color-transBlack);
        line-height: 1;
    }
    
    .end {
        color: var(--color-transBlack);
        font-size: var(--font-med);

        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }


</style>