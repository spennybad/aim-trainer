<script>

    // IMPORTS
    import Target from './Target.svelte';
    import { onInterval } from "../utils/Utils";
    import { Misses }from '../stores/MissesStore.js';
    import { Hits } from '../stores/HitsStore.js';
    import { Targets } from '../stores/TargetsStore.js';

    // PROPS
    export let time;
    export let config;

    // Object which stores the coordinate range which targets can spawn in without clipping off screen.
    let w;
    let h;
    
    onInterval(() => {

        $Targets[time] = {
            num: time, 
            x: getCoord(w, config.targetSize), 
            y: getCoord(h, config.targetSize),
            hit: false,
            hide: waitToBeHidden(time).catch((error) => console.log("Game quit by player."))
        };

    }, config.newTargetCooldown * 1000);

    async function waitToBeHidden(target) {
        await timeout(config.targetTiming * 1000);
        if ($Targets[target].hit != true) {
            Misses.update(s => s + 1);
            $Targets[target].hide = true;
        }
    }

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Genetates a random coordinate and insures that it is valid.
    // The "+10" acts as a border of 10
    const getCoord = (max) => {
        let coord = Math.floor(Math.random() * max);
        if (coord + config.targetSize > max) {
            coord -= config.targetSize + 10;
        } else if (coord - config.targetSize < 0) {
            coord += config.targetSize + 10;
        } else {
            return coord;
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
            <Target on:hit={handleTargetHit} targetDetails={$Targets[target]} config={config}/>
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