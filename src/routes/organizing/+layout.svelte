<script lang="ts">
    import {page} from '$app/stores';

    const prefix = '/organizing';
</script>
<div>
    <nav>
        <ul class="grid grid-cols-3 gap-2 w-full">
            <li class="item"><a href="{prefix}/category">Categories</a></li>
            <li class="item"><a href="{prefix}/item">Items</a></li>
            <li class="item"><a href="{prefix}/location/">Locations</a></li>
        </ul>
    </nav>

</div>

<slot/>

<style>
    .item {
        @apply bg-sky-500 rounded-full px-3 py-1 text-white flex items-center justify-center;
    }
</style>