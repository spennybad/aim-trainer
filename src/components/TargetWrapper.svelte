<script>

    import Target from './Target.svelte';
    import { onInterval } from "../utils/Utils";

    export let seconds;

    const targetSize = 30;
    const time = 1;

    $: targets = [];
    const screendim = { x: window.innerWidth - targetSize, y: window.innerHeight - targetSize};

    onInterval(() => {
        if (seconds % time == 0) targets = [...targets, {num: seconds / time, x: getCoord(screendim.x), y: getCoord(screendim.y)}];
        seconds += 1
    }, 1000);

    const getCoord = (max) => {
        let coord = Math.floor(Math.random() * max);
        if (coord + targetSize > max) {
            coord -= targetSize + 10;
        } else if (coord - targetSize < 0) {
            coord += targetSize + 10;
        } else {
            return coord;
        }
    }

    function handleTargetMiss(event) {
        targets = targets.filter((target) => {return target.num != event.detail.num});
    }

    function handleTargetHit(event) {
        targets = targets.filter((target) => {return target.num != event.detail.num});
    }

</script>


<div class="wrapper">
    {#each targets as target}
        <Target on:missed={handleTargetMiss} on:hit={handleTargetHit} targetDetails={target} />
    {/each}
</div>


<style>
    .wrapper {
        width: 100%;
        height: 100%;
 
        position: absolute;
        top: 0;
    }
</style>