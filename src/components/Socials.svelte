<script>
    import { fade } from 'svelte/transition';
</script>

<ul class="socials" transition:fade={{duration: 200}}>
    <li>
        <a href="https://www.linkedin.com/in/spencer-venable-31494a187">
            <img class="centered" src="/images/linkedin.svg" alt="LinkedIn">
        </a>
    </li>
    <li>
        <a href="https://github.com/Spencercv7/aim-trainer">
            <img class="centered" src="/images/github.svg" alt="GitHub">
        </a>
    </li>
</ul>

<style>
    .socials {
        position: absolute;
        top: 0;
        left: 0;

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: .5em;

        margin: 2em;
    }

    li {
        position: relative;

        background-color: orangered;
        border-radius: 100%;

        list-style: none;
        
        padding: .5em;
        box-shadow: var(--shadow-light);

        transition: all .2s;

        cursor: pointer;
        height: 3em;
        width: 3em;
    }

    li:hover {
        transform: scale(1.1);
    }

    img {
        height: 2em;
        width: 2em;
    }
</style>