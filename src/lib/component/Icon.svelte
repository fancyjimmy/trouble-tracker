<script>
    import {onMount} from "svelte";

    export let icon = "folder";
    export let type = "solid";
    export let bgColor = "rgba(255,255,255,0)";
    export let iconColor = "#000000";
    export let containerClass = "rounded";
    export let iconClass = "w-full h-full";

    let element;
    onMount(() => {
        if (iconColor !== "#000000") {
            element.contentDocument.querySelector("svg").setAttribute("fill", iconColor);
        }
    });
</script>

<div class="aspect-square {containerClass}" style="background-color: {bgColor}">
    <object title="icon" bind:this={element} type="image/svg+xml" data="\fontawesome\svgs\{type}\{icon}.svg"
            class="{iconClass}">
        <i class="fa-{type} fa-{icon}" style="color: {iconColor}"/>
    </object>
</div>
