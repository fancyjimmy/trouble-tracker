<script>
    import "../app.css";
    import {page} from "$app/stores";
    import NavLink from "./_NavLink.svelte";
    import Icon from "$lib/component/Icon.svelte";

</script>
<div class="dashboard">
    <nav class="grid h-screen content-center  bg-slate-900 navbar overflow-hidden">
        <ul class="flex flex-col gap-2 my-5">
            <li>
                <a href="/">
                    <div class="w-full flex justify-center">
                        <i class="text-white fa-solid fa-house text-3xl"/>
                    </div>
                </a>
            </li>

        </ul>
        <ul class="flex flex-col my-auto gap-2">
            <NavLink text="Organization" icon="fa-solid fa-cube" href="/organizing" currentRoute={$page.route.id}/>
            <NavLink text="About" icon="fa-solid fa-info" href="/about" currentRoute={$page.route.id} color="#facc15"/>
        </ul>
    </nav>

    <main class="p-2 bg-slate-800 h-screen overflow-y-scroll text-slate-300">
        <slot />

    </main>
</div>

<style>
    .dashboard {
        @apply grid h-max;

        grid-template-columns: auto 3fr;
    }

    .navbar{
        grid-template-rows: auto 1fr auto;
    }


</style>