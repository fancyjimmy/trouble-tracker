<script>
    export let name;
    export let id;
    export let description;
    export let color = "#ffffff";
    export let icon = 'book';
    export let count = 1;
</script>

<a href="/organizing/item/{id}">
    <article class="bg-slate-700 rounded-xl overflow-hidden shadow-lg">
        <div class="grid place-items-center w-full min-h-[5rem]"
             style="{color === null ? '' : 'background-color: ' + color }">
            <i class="fa-solid fa-{icon} text-2xl text-white"/>
        </div>
        <div class="flex flex-col p-3">
            <h2 class="text-xl font-bold text-white">{name}</h2>
            <p class="truncate">{description}</p>
        </div>
    </article>
</a>