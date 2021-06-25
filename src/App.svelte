<script>
    import { Targets } from './stores/TargetsStore.js';
    import { Hits } from './stores/HitsStore.js';
    import { Misses } from './stores/MissesStore.js';

    import GameInstance from './components/GameInstance.svelte';
    import Socials from './components/Socials.svelte';

    import GamemodeConfig from './utils/GamemodeConfig.js';

    import { fade } from 'svelte/transition';

    // If false -> not running, if true -> running.
    let gameState = false;

    // Default Gamemode == Classic
    let selectedGamemode = "classic";

    function getConfig() {
        if (selectedGamemode === "fury") return GamemodeConfig.fury;
        else if (selectedGamemode === "classic") return GamemodeConfig.classic;
    }

    function startGame() {
        wipeGame();
        gameState = true;
    }

    function wipeGame() {

        // Clear all timeouts once the game has ended.
        Object.keys($Targets).forEach(target => {
            clearTimeout($Targets[target].hide);
        });

        Targets.set({});
        Hits.set(0);
        Misses.set(0);
    }

    function handleCloseScreen(event) {
        // Handles Quiting game.
        if (event.key === "Escape" && gameState) {
            wipeGame();
            gameState = false;
        }
    }

</script>

<main>
    {#if !gameState}
        <Socials />
        <div class="menu_wrapper centered">
            <input type="radio" class="gamemode_selector" id="classic" bind:group={selectedGamemode} value={"classic"}>
            <label for="classic" class="gamemode_seclector_label">
                Classic
            </label>
            <button type="submit" transition:fade={{duration: 200}} class="start" on:click={startGame}>
                START
            </button>
            <input type="radio" class="gamemode_selector" id="fury" bind:group={selectedGamemode} value={"fury"}>
            <label for="fury" class="gamemode_seclector_label">
                fury
            </label>
        </div>
        <div id="gamemode_desc_wrapper">
            <p><span>*Classic:</span> The game ends if you let a target disappear, points are deducted for mis-clicks.</p>
            <p><span>*fury:</span> The game ends when the timer runs out, points are deducted for mis-clicking.</p>
        </div>
    {:else}
        <GameInstance config={getConfig(selectedGamemode)}/>
    {/if}
</main>

<!-- Listener for force quit event. -->
<svelte:window on:keydown={handleCloseScreen}/>

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
            width: 100%;
            grid-template-columns: none;
            grid-template-rows: repeat(3, 1fr);
        }
    }

    .gamemode_selector {
        display: none;
    }

    .gamemode_seclector_label {
        font-size: var(--font-med);
        transition: all .2s;
        padding: 0 .2em;
        border: .1em solid transparent;
        cursor: pointer;
    }

    .gamemode_seclector_label:hover {
        border-bottom: .1em solid var(--color-accent);
    }

    .gamemode_selector:checked + label {
        border: .1em solid var(--color-accent);
        color:black;
    }

    #gamemode_desc_wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: var(--font-tiny);
    }

    #gamemode_desc_wrapper p span {
        color: var(--color-accent);
    }

</style>