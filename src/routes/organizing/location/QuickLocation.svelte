<script>
    export let name = 'world';
    export let locationName = 'world';
    export let description = 'world';
    export let icon = 'world';
    export let color = '#000000';
</script>


<div class="shadow-md rounded-lg bg-slate-700 overflow-hidden">
    <a href="/organizing/location/{name}">
        <div class="grid grid-cols-2">
            <div class="h-full flex items-center justify-center" style="{color !== null ?'background-color: ' + color:'background-color: #808080'}">
                <i class="fa-solid fa-{icon} text-white text-4xl"/>
            </div>
            <div class="p-4">
                <h2 class="font-semibold truncate mt-3 text-white text-lg">{name}</h2>
                <p class="truncate mt-1">{locationName}</p>
                <p class="truncate mt-1">{description}</p>
            </div>
        </div>
    </a>
</div>