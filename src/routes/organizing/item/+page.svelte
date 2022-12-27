<script lang="ts">
    import Icon from "$lib/component/Icon.svelte";
    import QuickItem from "$lib/component/QuickItemGrid.svelte";

    export let data;

    let newItemDialog;
    let itemIcon;

    function openNewItemDialog() {
        newItemDialog.showModal();
    }
</script>

<div class="m-4">
    <h1 class="text-white text-3xl font-semibold my-9">Items</h1>


    <div class="grid grid-cols-[1fr_auto] gap-4 items-center my-3">
        <div class="grid grid-cols-[1fr_auto]">
            <form>
                <label for="default-search" class="mb-2 text-sm font-medium sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i class="fa-solid fa-search text-slate-300"/>
                    </div>
                    <input type="search" id="default-search"
                           class="block w-full p-4 pl-10 text-sm border-2 rounded-lg focus:border-sky-500 focus:outline-0 bg-slate-700 border-slate-600"
                           placeholder="Search Mockups, Logos..." required>
                </div>
            </form>
        </div>

        <button class="text-sky-500 hover:text-sky-600 duration-200" on:click={openNewItemDialog}><i
                class="fas fa-plus mr-2"/>New Item
        </button>
    </div>

    <div class="item-container">

        {#each data.items as item}
            <QuickItem {...item}/>
        {/each}

    </div>
</div>

<dialog bind:this={newItemDialog} class="rounded-xl shadow-xl w-[75vw]">
    <form class="p-2 flex flex-col" action="?/newItemWithLocation" method="post">
        <label for="name" class="mb-2">Item Name:</label>
        <input
                id="name"
                class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                type="text"
                name="name"
                placeholder="Name"
                required
        />


        <label for="category" class="mb-2">Item Category:</label>
        <select
                id="category"
                class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                type="text"
                name="category"
                required
        >
            {#each data.categories as category}
                <option value="{category.name}">{category.name}</option>
            {/each}
        </select>

        <label for="location" class="mb-2">Item Location:</label>
        <select
                id="location"
                class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                type="text"
                name="location"
        >
            <option>None</option>
            {#each data.possibleLocations as location}
                <option value="{location.name}">{location.name}</option>
            {/each}
        </select>
        <label for="description" class="mt-3 mb-2">Item Description:</label>
        <textarea
                id="description"
                type="text"
                name="description"
                class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                placeholder="Description"
                rows="4"
                required></textarea>


        <div class="flex my-3 items-center justify-between">
            <label for="color">Color: </label>
            <input
                    id="color"
                    class="h-8 rounded w-full"
                    type="color"
                    name="color"
                    placeholder="Color"
                    value="#f6b73c"
            />
        </div>

        <label for="icon" class="mb-2">Item Icon: </label>
        <div class="grid grid-cols-[1fr_2.5em]">
            <input
                    id="icon"
                    class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                    type="text"
                    name="icon"
                    placeholder="Icon"
                    bind:value={itemIcon}
            />
            <Icon bind:icon={itemIcon} containerClass="w-10 h-10 p-2"/>
        </div>

        <label for="count" class="mb-2 mt-3">Count: </label>
        <input
                class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                id="count"
                type="number"
                name="count"
                value="1"
                step="1"
                min="0"
        />

        <div class="grid grid-cols-2 gap-2 mt-3">
            <button
                    class="bg-slate-500 text-white rounded-md p-2 shadow-md"
                    on:click|preventDefault={() => {
					newItemDialog.close();
				}}
            >Cancel
            </button>
            <button class="bg-sky-500 text-white rounded-md p-2 shadow-md" type="submit"
            ><i class="fa-solid fa-plus mr-2"/>Create Item
            </button>
        </div>
    </form>
</dialog>

<style>
    .item-container {
        @apply grid gap-4 pt-4;

        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    textarea {
        @apply resize-none;
    }

    input[type="color"] {
        @apply w-10 h-10 rounded overflow-hidden;
        -webkit-appearance: none;
    }

    dialog::backdrop {
        @apply bg-black bg-opacity-50 backdrop-blur;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    input[type="color"]::-webkit-color-swatch {
        border: none;
    }
</style>
