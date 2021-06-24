<script>
    import { Targets } from './stores/TargetsStore.js';
    import { Hits } from './stores/HitsStore.js';
    import { Misses } from './stores/MissesStore.js';

    import GameInstance from './components/GameInstance.svelte';
    import GameResults from './components/GameResults.svelte';
    import Socials from './components/Socials.svelte';

    import GamemodeConfig from './utils/GamemodeConfig.js';
    import { EndStatus } from './utils/EndStatus.js';

    import { fade } from 'svelte/transition';

    // If false -> not running, if true -> running.
    let gameState = false;
    let selectedGamemode = "classic";
    let showEndScreen = false;
    let endGameStatus;

    function getConfig() {
        if (selectedGamemode === "furry") return GamemodeConfig.furry;
        else if (selectedGamemode === "classic") return GamemodeConfig.classic;
    }

    function startGame() {
        gameState = true;
    }

    function gameEnd(endStatus) {
        gameState = false;
        if (endStatus.reason != "quit") {
            showEndScreen = true;
            endGameStatus = endStatus;
        } else {
            wipeGame();
        }
    }

    function handleExitGame(event) {
        // Handles Quiting game.
        if (event.key === "Escape" && gameState) {
            gameEnd(EndStatus("quit", "na"));
        
        // Handles closing end screen.
        } else if (event.key === "Escape" && showEndScreen) {
            wipeGame();
        }
    }

    function wipeGame() {
        gameState = false;
        showEndScreen = false;
        endGameStatus = undefined;
        Targets.set({});
        Hits.set(0);
        Misses.set(0);
    }

</script>

<main>
    {#if !gameState && !showEndScreen}
        <Socials />
        <div class="menu_wrapper centered">
            <input type="radio" class="gamemode_selector" id="classic" bind:group={selectedGamemode} value={"classic"}>
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
        <div id="gamemode_desc_wrapper">
            <p><span>*Classic:</span> The game ends if you let a target disappear, points are deducted for mis-clicks.</p>
            <p><span>*Furry:</span> The game ends when the timer runs out, points are deducted for mis-clicking.</p>
        </div>
    {:else if gameState}
        <GameInstance config={getConfig(selectedGamemode)} endGame={gameEnd}/>
    {:else}
        <GameResults endTime={endGameStatus.endTime} config={getConfig(selectedGamemode)}/>
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
        padding: 0 .2em;
        border: .1em solid transparent;
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