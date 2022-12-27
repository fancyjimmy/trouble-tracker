<script lang="ts">
    import type {PageServerLoad} from "./$types";
    import Item from "$lib/component/QuickItem.svelte";
    import Icon from "$lib/component/Icon.svelte";

    export let data: PageServerLoad;
    let newItemDialog;
    let itemIcon;
</script>


<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    <div class="m-2">
        <div class="flex mb-3 justify-between h-12 items-center">
            <h2 class="text-2xl font-semibold text-white">Category Detail</h2>
        </div>
        <div class="bg-slate-700 border border-slate-600 border rounded-xl p-3 shadow">
            <div>
                <h3 class="text-xl text-white font-semibold">Name</h3>
                <p class="text-xl">{data.category.name}</p>
            </div>
            <div class="mt-4">
                <h3 class="text-xl text-white font-semibold">Description</h3>
                <p>{data.category.description}</p>
            </div>

            <div class="mt-3">
                <h3 class="text-xl text-white font-semibold">Icon</h3>

                <div class="flex justify-between items-center">
                    <p>{data.category.icon}</p>
                    <Icon icon={data.category.icon} containerClass="w-10 h-10 p-2 rounded-xl shadow border-slate-600"
                          bgColor="#94a3b8"/>

                </div>
            </div>

            <div class="rounded-xl mt-4 p-3 bg-slate-600"
                 style="{data.category.color === null ? '' : 'background-color: ' + data.category.color}">
                <h3 class="text-xl text-white font-semibold">Color</h3>

                <p>{data.category.color === null ? "None" : data.category.color}</p>

            </div>
        </div>
    </div>

    <div class="m-2">
        <div class="flex mb-3 justify-between h-12 items-center">
            <h2 class="text-2xl font-semibold text-white">Items</h2>
        </div>
        <div class="bg-slate-700 rounded-xl  border border-slate-600 overflow-hidden">
            {#each data.items as item}
                <Item {...item}/>
            {/each}
        </div>

        <div class="flex mt-2">
            <button class="text-sky-500 align-center ml-auto p-2 hover:text-sky-600 duration-200"
                    on:click|preventDefault={() => {newItemDialog.showModal()}}>
                <i class="fa-solid fa-plus mr-2"/>
                New Item
            </button>
        </div>

    </div>

</div>


<dialog bind:this={newItemDialog} class="rounded-xl shadow-xl w-[75vw]">

    <form class="p-2 flex flex-col" action="?/newItem" method="post">
        <label for="name" class="mb-2">Item Name:</label>
        <input id="name"
               class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
               type="text" name="name" placeholder="Name" required>
        <label for="description" class="mt-3 mb-2">Item Description:</label>
        <textarea id="description" type="text" name="description"
                  class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                  placeholder="Description" rows="4" required/>
        <div class="flex my-3 items-center justify-between">
            <label for="color">Color: </label>
            <input id="color"
                   class="h-8 rounded w-full"
                   type="color" name="color" placeholder="Color"
                   value="#f6b73c">
        </div>

        <label for="icon" class="mb-2">Item Icon: </label>
        <div class="grid grid-cols-[1fr_2.5em]">
            <input id="icon"
                   class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                   type="text" name="icon" placeholder="Icon" bind:value={itemIcon}>
            <Icon bind:icon={itemIcon} containerClass="w-10 h-10 p-2"/>
        </div>

        <label for="count" class="mb-2 mt-3">Count: </label>
        <input class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" id="count" type="number" name="count" value="1" step="1" min="0">



        <div class="grid grid-cols-2 gap-2 mt-3">
            <button class="bg-slate-500 text-white rounded-md p-2 shadow-md"
                    on:click|preventDefault={() => {newItemDialog.close  ()}}>Cancel
            </button>
            <button class="bg-sky-500 text-white rounded-md p-2 shadow-md" type="submit"><i
                    class="fa-solid fa-plus mr-2"/>Create Item
            </button>
        </div>

    </form>
</dialog>

<style>
    textarea {
        @apply resize-none;
    }

    input[type="color"] {
        @apply w-10 h-10 rounded overflow-hidden;
        -webkit-appearance: none;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    input[type="color"]::-webkit-color-swatch {
        border: none;
    }

    dialog::backdrop {
        @apply bg-black bg-opacity-50 backdrop-blur;
    }
</style>