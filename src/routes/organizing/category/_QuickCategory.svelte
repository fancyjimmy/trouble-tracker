<script lang="ts">

    import Icon from "$lib/component/Icon.svelte";

    export let name = "world";
    export let description = "A simple example of a component";
    export let color = "#600505";
    export let icon = "folder";
    export let createdAt = new Date();
</script>

<div class="shadow-md rounded-lg h-34 bg-slate-700 overflow-hidden">
    <a href="/organizing/category/{name}">
        <div class="grid grid-cols-2">
            <div class="w-full h-full flex items-center justify-center" style="background-color: {color}">
                <i class="fa-solid fa-{icon} text-white text-4xl"/>
            </div>
            <div class="h-28 p-3">
                <h2 class="font-semibold truncate mt-3 text-white text-lg">{name}</h2>
                <p class="truncate mt-1">{description}</p>
            </div>
        </div>
    </a>
</div>