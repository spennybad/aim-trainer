<script>
    import { fade } from 'svelte/transition';
    import { Targets } from '../stores/TargetsStore.js';
    import { Hits } from '../stores/HitsStore.js';
    import { Misses } from '../stores/MissesStore.js';
    import { TotalScore } from '../stores/TotalScore.js';

    export let endTime;

</script>

<div id="wrapper" transition:fade={{duration: 200}}>
    <h1 id="header">Your Results</h1>
    <div id="data_wrapper">
        <div class="text">
            <p>Hits: <span>{$Hits}</span></p>
            <p>Misses: <span>{$Misses}</span></p>
            <p>Final Score: <span>{$TotalScore}</span></p>
        </div>
        <div id="heatmap_wrapper">
            <div id="heatmap">
                {#each Object.keys($Targets) as target}
                    {#if $Targets[target].num + ($Targets[target].lifespan * 1000) <= endTime}
                        <div 
                            class="heat_target"
                            style={`
                                height: 16px;
                                width: 16px;
                                top: ${$Targets[target].y}%; 
                                right: ${$Targets[target].x}%;
                                background: ${$Targets[target].hit ? "var(--background-hit)" : "var(--background-miss)"};
                            `}
                        />
                    {/if}
                {/each}
            </div>
        </div>
    </div>
    <p class="end">Press "ESC" to go back to main menu.</p>
</div>

<style>
    #wrapper {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-rows: 1fr 2fr .5fr;
        justify-items: center;
        align-items: center;
    }

    #header {
        font-size: var(--font-big);
        color: var(--color-accent);
        align-self: flex-end;
    }

    #data_wrapper {
        display: grid;
        align-items: center;
        height: 100%;
        width: 80%;
        grid-template-columns: 2fr 3fr;
        grid-gap: .5em;
    }

    .text {
        font-size: var(--font-small);
        justify-self: center;
        text-align: right;
    }

    .text p span {
        color: var(--color-accent);
    }

    #heatmap {
        height: 100%;
        width: 100%;
        position: relative;
    }

    #heatmap_wrapper {
        position: relative;
        height: 80%;
        width: 90%;
        padding: .5em;
        border: .7em solid black;
        overflow: hidden;
    }

    .heat_target{
        position: absolute;
        border-radius: 100%;
    }

    .end {
        color: var(--color-transBlack);
        font-size: var(--font-small);
        white-space: nowrap;
    }

</style>
