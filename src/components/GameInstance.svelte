<script>

    // Store Imports 
    import { TotalScore } from '../stores/TotalScore.js';
    import { Targets } from '../stores/TargetsStore.js';

    // Animation Imports
    import { fade } from 'svelte/transition';

    // Component Imports
    import TargetWrapper from './TargetWrapper.svelte';
    import { onInterval } from '../utils/Utils.js';
    import { EndState } from '../utils/EndState.js';
    import GameResults from './GameResults.svelte';

    // PROPS
    export let config;

    let time = 0;
    let mousecoords = { x: 0, y: 0};
    $: displayTime = getDisplayTime(time);
    let endGameState;

    function handleMouseMove(event) {
        mousecoords.x = event.clientX;
        mousecoords.y = event.clientY;
    }

    function endGame(_endGameState) {
        Object.keys($Targets).forEach(target => {
            clearTimeout($Targets[target].hide);
        });
        endGameState = _endGameState;
    }

    // Time tracker... every millisecond. Used to sync all app actions.
    onInterval(() => {
        time += 100;
    }, 100);

    // If gamemode config contains a time then it is set and subtracted from, else clock simply counts up.
    function getDisplayTime() {
        if (config.roundTime) {
            const displayTime = config.roundTime - Math.floor(time/1000);
            if (displayTime == 0) {
                endGame(EndState("timeout", config.name, time));
            }
            return config.roundTime - Math.floor(time/1000);
        } else {
            return Math.floor(time/1000);
        }
    }

</script>

{#if !endGameState}
    <div id="wrapper" on:mousemove={handleMouseMove} transition:fade={{duration: 200}}>
        <div id="hud_wrapper">
            <p class="end">Press "ESC" to end game.</p>
            <p id="timer"><span>Time = </span>{displayTime}</p>
            <div class="centered score">{$TotalScore}</div>
            <p id="mouse_coords">{mousecoords.x}, {mousecoords.y}</p>
        </div>
        <!-- To have logic added around for passing specific configs based on what config is active. -->
        <TargetWrapper bind:time={time} config={config} endGame={endGame}/>
    </div>
{:else}
    <GameResults endTime={endGameState.endTime} />
{/if}

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
        font-size: var(--font-small);
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
        font-size: var(--font-small);
        white-space: nowrap;

        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }


</style>