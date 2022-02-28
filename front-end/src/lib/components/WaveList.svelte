<script lang="ts">    
    import { onDestroy } from "svelte";
    import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
    
    import type { Wave } from "$lib/types/Wave";
    import { WaveStore } from "$lib/stores/WaveStore";
    import { sort } from 'fast-sort';

    let sortedWaves: Wave[] = [];

    const unsub = WaveStore.subscribe((waves) => {        
        sortedWaves = sort(waves).desc(w => parseInt(w.timestamp));
    });

    onDestroy(() => {
        unsub();
    });

</script>

{#if sortedWaves !== undefined && sortedWaves.length > 0}
    <div>
        <h1 class="messageHeader">Messages</h1>
        {#each sortedWaves || [] as wave (wave.timestamp) }
            <div class="message" 
                transition:scale|local={{ start: 0.7 }}
                animate:flip={{ duration: 200 }}>
                <div><strong>From: </strong>{wave.from}</div>
                <div><strong>At: </strong>{wave.timestamp}</div>
                <div><strong>Message: </strong>{wave.message}</div>
            </div>
        {/each}
    </div>
{/if}

<style>
    .messageHeader {
        font-size: 1.5rem;
        text-align: center;
        font-weight: 400;
        color: var(--heading-color);
        line-height: 1;
    }

    .message {
        display: grid;
        grid-template-rows: auto;
        grid-gap: 0.5rem;
        align-items: center;
        margin: 0 0 0.5rem 0;
        padding: 0.5rem;
        background-color: white;
        border-radius: 10px;
        filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
        transform: translate(-1px, -1px);
        transition: filter 0.2s, transform 0.2s;
        font-size: 12px;
    }
</style>
