<script>
    import GameInstance from './components/GameInstance.svelte';
    import Socials from './components/Socials.svelte';

    import GamemodeConfig from './utils/GamemodeConfig.js';

    import { fade } from 'svelte/transition';

    // If false -> not running, if true -> running.
    let gameState = false;
    let selectedGamemode;

    function startGame() {
        gameState = true;
    }

    function gameEnd(endStatus) {
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
        <div class="menu_wrapper centered">
            <input type="radio" class="gamemode_selector" id="classic" bind:group={selectedGamemode} value={"classic"} checked>
            <label for="classic" class="gamemode_seclector_label">
                Classic
            </label>
            <button type="submit" transition:fade={{duration: 200}} class="start" on:click={startGame}>
                START
            </button>
            <input type="radio" class="gamemode_selector" id="furry" bind:group={selectedGamemode} value={"furry"}>
            <label for="furry" class="gamemode_seclector_label">
                Furry
            </label>
        </div>
    {:else}
        <GameInstance config={selectedGamemode == "furry" ? GamemodeConfig.furry : GamemodeConfig.classic} endGame={gameEnd}/>
    {/if}
</main>

<svelte:window on:keydown={handleExitGame}/>

<style>

    main {
        width: 100%;
        height: 100vh;
    }

    .start {
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
        transform: scale(1.1);
    }

    .menu_wrapper {
        display: grid;
        width: 50%;
        grid-template-columns: repeat(3, 33%);
        justify-items: center;
        align-items: center;
    }

    
    @media only screen and (max-width: 800px) {

        .menu_wrapper {
            display: grid;
            width: 100%;
            grid-template-columns: none;
            grid-template-rows: repeat(3, 1fr);
            justify-items: center;
            align-items: center;
        }
    }

    .gamemode_selector {
        display: none;
    }

    .gamemode_seclector_label {
        font-size: var(--font-med);
        transition: all .2s;
        padding: .01em .2em;
        border: .1em solid transparent;
    }

    .gamemode_seclector_label:hover {
        border: .1em solid var(--color-accent);
    }

    .gamemode_selector:checked + label {
        background-color: orangered;
        color: white;
    }

</style>