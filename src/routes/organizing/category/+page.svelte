<script lang="ts">
    import type {PageServerLoad} from "./$types"
    import QuickCategory from "./_QuickCategory.svelte"
    import Icon from "$lib/component/Icon.svelte";

    export let data: PageServerLoad
    let createCategoryDialog;
    let newIcon = "folder";
</script>


<h1 class="font-semibold text-3xl my-9 ml-5 text-white">Categories</h1>

<div class="m-3">
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

        <button on:click|preventDefault={() => {createCategoryDialog.showModal()}}
                class="ml-5 text-sky-500 text-lg hover:text-sky-400 duration-200 pr-5"><i class="fa-solid fa-plus"/> New
            Category
        </button>

    </div>

    <div class="category-container">
        {#each data.categories as category}
            <QuickCategory {...category}/>
        {/each}
    </div>
</div>
<dialog class="rounded-xl shadow-xl w-[75vw]" bind:this={createCategoryDialog}>
    <form class="p-2 flex flex-col" action="?/createCategory" method="post">
        <label for="name" class="mb-2">Category Name:</label>
        <input id="name"
               class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
               type="text" name="name" placeholder="Name" required>
        <label for="description" class="mt-3 mb-2">Category Description:</label>
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

        <label for="icon" class="mb-2">Category Icon: </label>
        <div class="grid grid-cols-[1fr_2.5em]">
            <input id="icon"
                   class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                   type="text" name="icon" placeholder="Icon" bind:value={newIcon}>
            <Icon bind:icon={newIcon} containerClass="w-10 h-10 p-2"/>

        </div>

        <div class="grid grid-cols-2 gap-2 mt-3">
            <button class="bg-slate-500 text-white rounded-md p-2 shadow-md"
                    on:click|preventDefault={() => {createCategoryDialog.close  ()}}>Cancel
            </button>
            <button class="bg-sky-500 text-white rounded-md p-2 shadow-xl" type="submit"><i
                    class="fa-solid fa-plus mr-2"/>Create Category
            </button>
        </div>

    </form>
</dialog>


<style>
    .category-container {
        @apply grid gap-4 pt-4;

        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    textarea {
        @apply resize-none;
    }

    input[type="color"] {
        @apply w-10 h-10 rounded overflow-hidden;
        -webkit-appearance: none;
    }


</style>