<script lang="ts">
    export let href = "";
    export let text: string;
    export let icon: string;

    export let currentRoute = "";
    export let color = "#38bdf8";

    let active;

    $: active = currentRoute.startsWith(href);
</script>

<li class="relative my-0.5 text-slate-400 hover:text-white duration-200">
    <a href="{href}">
        <div class="nav-item" class:selected={active} style="--inner-color: {color}">
            <div class="icon-container" style="{active ? 'background-color: ' + color : ''}">
                <i class="{icon} fa-spin-hover text-xl mr-2 icon" />
            </div>
            <p class="text-left pl-2 hidden 2xl:block md:block xl:block" style="{ active ? 'color: ' + color : ''}">{text}</p>
        </div>
    </a>
</li>

<style>
    .nav-item {
        @apply grid items-center text-center gap-2 pl-5 pr-6 text-lg ;
        vertical-align: middle;
        grid-template-columns: 30px 1fr;
    }

    .selected{
        @apply text-sky-400;
    }
    .icon-container{
        @apply flex justify-center aspect-square;
    }

    .selected .icon-container{
        @apply text-white bg-sky-500 rounded;
    }

    .icon{
        @apply m-0;
    }
    .selected::after {
        @apply h-10 w-10;
        background-color: var(--inner-color);
        content: "";
        position: absolute;
        transition: 500ms;

        display: block;
        right:  calc(2.5rem / -2);
        margin-top: auto;
        margin-bottom: auto;

        clip-path: polygon(50% 0, 100% 0%, 100% 100%, 50% 100%, 0% 50%);
    }

</style>