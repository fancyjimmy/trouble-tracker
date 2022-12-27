<script lang="ts">
    import type {PageServerData} from './$types';
    import Item from '$lib/component/QuickItemGrid.svelte';
    import Icon from '$lib/component/Icon.svelte';

    export let data: PageServerData;

    let newItemDialog;

    function openNewItemDialog() {
        newItemDialog.showModal();
    }

    let itemIcon = 'book';
</script>

<div class="grid grid-cols-1 lg:grid-cols-[350px_1fr] xl:grid-cols-[350px_1fr] gap-3 m-2">
    <div class="">
        <div class="my-3">
            <h1 class="text-2xl text-white font-semibold">Location Details</h1>
        </div>

        <div class="rounded-xl bg-slate-700 shadow-lg p-3">
            <h2 class="text-xl text-white font-semibold">Name</h2>

            <h1>{data.location.name}</h1>
            <h2 class="text-xl text-white font-semibold">Location Name</h2>
            <p>{data.location.locationName}</p>
            <h2 class="text-xl text-white font-semibold">Description</h2>
            <p>{data.location.description}</p>

            <div class="mt-3">
                <h3 class="text-xl text-white font-semibold">Icon</h3>

                <div class="flex justify-between items-center">
                    <p>{data.location.icon}</p>
                    <Icon
                            icon={data.location.icon}
                            containerClass="w-10 h-10 p-2 rounded-xl shadow border-slate-600"
                            bgColor="#94a3b8"
                    />
                </div>
            </div>

            <div
                    class="rounded-xl mt-4 p-3 bg-slate-600"
                    style={data.location.color === null ? '' : 'background-color: ' + data.location.color}
            >
                <h3 class="text-xl text-white font-semibold">Color</h3>

                <p>{data.location.color === null ? 'None' : data.location.color}</p>
            </div>
        </div>
    </div>
    <div class="flex flex-col">
        <div class="my-3">
            <h1 class="text-2xl text-white font-semibold">Items</h1>
        </div>
        <div
                class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] bg-slate-600 p-2 gap-2 rounded-xl shadow"
        >
            {#if data.items.length === 0}
                <p>No Items</p>
            {:else}
                {#each data.items as item}
                    <Item {...item}/>
                {/each}
            {/if}
        </div>

        <div class="mt-4 flex">
            <button
                    class="text-sky-500 p-2 ml-auto hover:text-sky-600 duration-200"
                    on:click|preventDefault={openNewItemDialog}
            ><i class="fas fa-plus mr-2"/>New Item
            </button>
        </div>
    </div>
</div>

<dialog bind:this={newItemDialog} class="rounded-xl shadow-xl w-[75vw]">
    <form class="p-2 flex flex-col" action="?/newItemWithLocation" method="post">
        <label for="name" class="mb-2">Name:</label>
        <input
                id="name"
                class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                type="text"
                name="name"
                placeholder="Name"
                required
        />

        <label for="category" class="mb-2">Category:</label>
        <select
                id="category"
                class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                type="text"
                name="category"
                required
        >
            {#each data.categories as category}
                <option value={category.name}>{category.name}</option>
            {/each}
        </select>

        <label for="description" class="mt-3 mb-2">Description:</label>

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

        <label for="icon" class="mb-2">Icon: </label>
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
    input[type="color"] {
        @apply w-10 h-10 rounded overflow-hidden;
        -webkit-appearance: none;
    }
</style>
