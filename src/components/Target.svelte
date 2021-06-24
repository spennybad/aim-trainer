<script>

    // IMPORTS
    import { createEventDispatcher } from 'svelte';

    // PROPS
    export let targetDetails;

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
            height: ${targetDetails.size}px;
            width: ${targetDetails.size}px;
            position: absolute; 
            top: ${targetDetails.y}px; 
            right: ${targetDetails.x}px;
            animation: shrink ${targetDetails.lifespan}s;
        `}
    />
{/if}

<style>
    .target {
        background-color: var(--color-accent);
        border-radius: 100%;
    }
</style>