<script lang="ts">    
    import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
    import type { Wave } from '$lib/types/wave';

    export let allWaves: Wave[];
</script>

{#if allWaves.length > 0}
    <h1 class="messageHeader">Messages</h1>
{/if}
{#each allWaves || [] as wave (wave.timestamp) }
    <div class="message" 
        transition:scale|local={{ start: 0.7 }}
        animate:flip={{ duration: 200 }}>
        <div><strong>From: </strong>{wave.from}</div>
        <div><strong>At: </strong>{wave.timestamp}</div>
        <div><strong>Message: </strong>{wave.message}</div>
    </div>
{/each}