<script>

    // IMPORTS
    import { onInterval } from "../utils/Utils";
    import { createEventDispatcher } from 'svelte';

    // PROPS
    export let targetDetails;

    const dispatch = createEventDispatcher();
    let seconds = 5;

    onInterval(() => {
        seconds -= 1
        if (seconds == 0) {
            dispatch('missed', {num: targetDetails.num})
        }
    }, 1000);

   function handleTargetHit() {
       dispatch('hit', {num: targetDetails.num})
   }

</script>

{#if targetDetails} 
    <div class="target" on:click={handleTargetHit} style={`position: absolute; top: ${targetDetails.y}px; right: ${targetDetails.x}px`}/>
{/if}

<style>
    .target {
        background-color: var(--color-accent);
        height: 3em;
        width: 3em;
        border-radius: 100%;
    }
</style>