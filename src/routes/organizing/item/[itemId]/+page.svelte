<script lang="ts">
    import type {PageServerData} from './$types';
    import {applyAction, enhance} from '$app/forms';
    import {invalidateAll} from '$app/navigation';
    import Icon from '$lib/component/Icon.svelte';

    export let data: PageServerData;
    export let newItem = {...data.item};

    function shallowEqual(item, newItem) {
        return JSON.stringify(item) === JSON.stringify(newItem);
    }

    function isInteger(value) {
        return /^\d+$/.test(value);
    }

    async function handleSubmit(event) {
        const data = new FormData(this);

        data.set('id', newItem.id);
        data.set('name', newItem.name);
        data.set('description', newItem.description);
        data.set('color', newItem.color);
        data.set('icon', newItem.icon);
        data.set('count', newItem.count);
        data.set('categoryName', newItem.categoryName);
        const response = await fetch(this.action, {
            method: 'POST',
            body: data
        });
        /** @type {import('@sveltejs/kit').ActionResult} */
        const result = await response.json();

        if (result.type === 'success') {
            // re-run all `load` functions, following the successful update
            await invalidateAll();
        }

        applyAction(result);
    }
</script>

<div class="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"/>

<div class="m-2 gap-3 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    <div>
        <div class="flex mb-3 justify-between h-12 items-center">
            <h1 class="text-white text-2xl font-semibold">Item Detail</h1>
            {#if !shallowEqual(data.item, newItem)}
                <form action="?/updateItem" on:submit|preventDefault={handleSubmit}>
                    <i class="fa-solid fa-refresh text-xl text-sky-500"/>
                    <input type="submit" value="Update" class="text-sky-500 text-xl"/>
                </form>
            {/if}
        </div>
        <div class="bg-slate-700 rounded-xl p-3 relative">
            <p class="absolute block right-0 p-3 top-0 text-white text-xl font-semibold">#{data.item.id}</p>
            <h3 class="text-white font-semibold text-xl">Name</h3>
            <h1 contenteditable="true" bind:innerHTML={newItem.name}>{data.item.name}</h1>
            <h3 class="text-white font-semibold text-lg">Description</h3>

            <p contenteditable="true" bind:innerHTML={newItem.description}>{data.item.description}</p>
            <h3 class="text-white font-semibold text-lg">Count</h3>

            <p contenteditable="true" bind:innerHTML={newItem.count}>{data.item.count}</p>

            <div class="grid grid-cols-2">
                <div>
                    <h3 class="text-white font-semibold text-lg">Created At</h3>
                    <p>{data.item.createdAt.toLocaleString()}</p>
                </div>

                <a href="/organizing/category/{data.item.categoryName}" class="group">
                    <div>
                        <h3 class="text-white font-semibold text-lg group-hover:text-sky-500 group-hover:underline duration-200">Category</h3>
                        <p class="group-hover:text-sky-500 text-underline duration-200 group-hover:underline">{data.item.categoryName}</p>
                    </div>
                </a>

            </div>
            <div class="mt-3">
                <h3 class="text-xl text-white font-semibold">Icon</h3>

                <div class="flex justify-between items-center">
                    <p contenteditable="true" bind:innerHTML={newItem.icon}/>
                    <Icon
                            icon={newItem.icon}
                            containerClass="w-10 h-10 p-2 rounded-xl shadow border-slate-600 flex items-center"
                            bgColor="#94a3b8"
                    />
                </div>
            </div>

            <div
                    class="rounded-xl mt-4 p-3 bg-slate-600"
                    style={newItem.color === null ? '' : 'background-color: ' + newItem.color}
            >
                <h3 class="text-xl text-white font-semibold">Color</h3>

                <p contenteditable="true" bind:innerHTML={newItem.color}>
                    {data.item.color === null ? 'None' : data.item.color}
                </p>
            </div>
        </div>
    </div>


    <div>
        <div class="flex mb-3 justify-between h-12 items-center">
            <h2 class="text-2xl font-semibold text-white">History</h2>
        </div>
        <div class="bg-slate-700 rounded-xl shadow p-3">
            {#if data.history.length >= 1}
                {#each data.history as history}
                    <div class="grid grid-cols-3 items-center">
                        <p>{history.start.toLocaleString()}</p>
                        <p>{history.end ? history.end.toLocaleString() : 'Now'}</p>
                        <a class="hover:underline hover:text-sky-500 duration-200 group" href="/organizing/location/{history.locationName}">
                            <p class="text-lg text-white font-semibold group-hover:text-sky-500 duration-200">{history.locationName}</p>
                        </a>
                    </div>
                {/each}
            {:else}
                <p>No History</p>
            {/if}

        </div>

        <form action="?/moveItem" method="post" class="text-sky-500 grid grid-cols-3 gap-3 m-3">
            <label for="locations">Move To Location</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i class="fas fa-map-marker-alt"/>
                </div>
                <select id="locations" name="name"
                        class="block p-2 pl-10 w-full text-sm border-2 rounded-lg focus:border-sky-500 focus:outline-0 bg-slate-700 border-slate-600">
                    {#each data.possibleLocations as location}
                        <option value={location.name} class="p-2 flex justify-center">{location.name}</option>
                    {/each}
                </select>
            </div>

            <input type="submit" value="Move" class="bg-sky-500 text-white p-2 rounded border-none"/>
        </form>
    </div>
</div>
