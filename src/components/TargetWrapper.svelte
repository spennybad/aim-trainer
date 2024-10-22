<script>

    // IMPORTS
    import Target from './Target.svelte';
    import { onInterval } from "../utils/Utils";
    import { Misses }from '../stores/MissesStore.js';
    import { Hits } from '../stores/HitsStore.js';
    import { Targets } from '../stores/TargetsStore.js';
    import { EndState } from '../utils/EndState.js';

    // PROPS
    export let time;
    export let config;

    export let endGame;

    // Object which stores the coordinate range which targets can spawn in without clipping off screen.
    let w;
    let h;
    
    onInterval(() => {

        const targetSize = config.targetSize();
        const targetLifeSpan = config.targetLifeSpan();

        $Targets[time] = {
            num: time, 
            x: getCoord(w, targetSize), 
            y: getCoord(h, targetSize),
            size: targetSize,
            lifespan: targetLifeSpan,
            hit: false,
            hide: waitToBeHidden(time, targetLifeSpan)
        };

    }, config.newTargetCooldown * 1000);

    function waitToBeHidden(target, targetLifeSpan) {

        return setTimeout(() => {
            if ($Targets[target].hit == false) {
                
                // Insures that if the hide promise is resolved post end of game the target is not counted.
                if (config.subtractOnMiss) Misses.update(s => s + 1);
                
                $Targets[target].hide = true;

                // Ends game if one is missed and the gamemode calls for the game to end.
                if (config.endOnMiss) {
                    endGame(EndState("miss", config.name, time))
                };
            }
        }, targetLifeSpan * 1000);
    }

    // Genetates a random coordinate and insures that it is valid.
    // The "+10" acts as a border of 10
    const getCoord = (max, targetSize) => {
        let coord = Math.floor(Math.random() * max);
        if (coord + targetSize > max) {
            coord -= targetSize + 10;
        } else if (coord - targetSize < 0) {
            coord += targetSize + 10;
        } else {
            return (coord/max) * 100;
        }
    }

    // Handler which catches target hit event which is dispatched by Target.svelte.
    function handleTargetHit(event) {
        Hits.update(s => s + 1);
        $Targets[event.detail.num].hide = true;
        $Targets[event.detail.num].hit = true;
    }

    function handleTargetMiss() {
        Misses.update(s => s + 1);
    }

</script>


<div class="wrapper" bind:clientWidth={w} bind:clientHeight={h}>
    <div id="miss_detector" on:click={handleTargetMiss}/>
    {#each Object.keys($Targets) as target}
        {#if $Targets[target].hide != true}
            <Target on:hit={handleTargetHit} targetDetails={$Targets[target]} />
        {/if}
    {/each}
</div>


<style>
    .wrapper {
        width: 100%;
        height: 100%;
    }

    #miss_detector {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
    }
</style>