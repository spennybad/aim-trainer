<script>

    // IMPORTS
    import { createEventDispatcher } from 'svelte';

    // PROPS
    export let targetDetails;
    export let config;

    const dispatch = createEventDispatcher();
    
    function handleTargetHit() {
        dispatch('hit', {num: targetDetails.num})
    }

</script>

{#if targetDetails} 
    <div 
        class="target" 
        on:click={handleTargetHit} 
        style={`
            height: ${config.targetSize}px;
            width: ${config.targetSize}px;
            position: absolute; 
            top: ${targetDetails.y}px; 
            right: ${targetDetails.x}px;
            animation: shrink ${config.targetTiming}s;
        `}
    />
{/if}

<style>
    .target {
        background-color: var(--color-accent);
        border-radius: 100%;
    }
</style>