<script lang="ts">
    import type {PageServerData} from "./$types";
    import {page} from "$app/stores";
    import QuickLocation from "./QuickLocation.svelte";
    import Icon from "$lib/component/Icon.svelte";

    export let data: PageServerData;


    export let newLocationDialog;
    function openDialog(){
        newLocationDialog.showModal();
    }

    let newIcon = "box";
</script>

<div class="m-2">
    <div class="my-9 flex justify-between">
        <h1 class="text-4xl text-white text-semibold">Locations</h1>
        <button class="text-lg text-sky-500 hover:text-sky-600 duration-200" on:click|preventDefault={openDialog}><i class="fas fa-plus"/> New Location</button>
    </div>
    <div class="grid location-grid">
        {#each data.locations as location}
            <QuickLocation {...location}/>
        {/each}
    </div>
</div>



<dialog bind:this={newLocationDialog} class="rounded-xl shadow">
    <form class="p-2 flex flex-col" action="?/newLocation" method="post">
        <label for="name" class="mb-2">Name:</label>
        <input id="name"
               class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
               type="text" name="name" placeholder="Name" required>

        <label for="locationName" class="mb-2">Location Name:</label>
        <input id="locationName"
               class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
               type="text" name="locationName" placeholder="Name" required>
        <label for="description" class="mt-3 mb-2">Description:</label>
        <textarea id="description" type="text" name="description"
                  class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                  placeholder="Description" rows="4" required/>
        <div class="flex my-3 items-center justify-between">
            <label for="color">Color: </label>
            <input id="color"
                   class="h-8 rounded w-full"
                   type="color" name="color" placeholder="Color"
                   value="#eeff00">
        </div>

        <label for="icon" class="mb-2">Location Icon: </label>
        <div class="grid grid-cols-[1fr_2.5em]">
            <input id="icon"
                   class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                   type="text" name="icon" placeholder="Icon" bind:value={newIcon}>
            <Icon bind:icon={newIcon} containerClass="w-10 h-10 p-2"/>

        </div>

        <div class="grid grid-cols-2 gap-2 mt-3">
            <button class="bg-slate-500 text-white rounded-md p-2 shadow-md"
                    on:click|preventDefault={() => {newLocationDialog.close  ()}}>Cancel
            </button>
            <button class="bg-sky-500 text-white rounded-md p-2 shadow-xl" type="submit"><i
                    class="fa-solid fa-plus mr-2"/>Create Location
            </button>
        </div>

    </form>


</dialog>


<style>
    .location-grid {
        @apply gap-2;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    input[type="color"] {
        @apply w-10 h-10 rounded overflow-hidden;
        -webkit-appearance: none;
    }
</style>