<script>
    import GameInstance from './components/GameInstance.svelte';
    import Socials from './components/Socials.svelte';

    import { fade } from 'svelte/transition';

    // If false -> not running, if true -> running.
    let gameState = false;

    function startGame() {
        gameState = true;
    }

    function gameEnd() {
        gameState = false;
    }

    function handleExitGame(event) {
        if (event.key === "Escape" && gameState) {
            gameEnd();
        }
    }

</script>

<main>
    {#if !gameState}
        <Socials />
        <button transition:fade={{duration: 200}} class="centered start" on:click={startGame}>
            START
        </button>
    {:else}
        <GameInstance />
    {/if}
</main>

<svelte:window on:keydown={handleExitGame}/>

<style>

    main {
        width: 100%;
        height: 100vh;
    }

    .start {
        height: auto;
        width: 20%;
        font-size: var(--font-big);
    }

    button {
        border: none;
        color: var(--color-accent);
        text-transform: capitalize;
        background: none;
        display: inline-block;
        transition: all .2s;
        cursor: pointer;
    }

    button:hover {
        transform: translate(-50%, -50%) scale(1.1);
    }

</style>