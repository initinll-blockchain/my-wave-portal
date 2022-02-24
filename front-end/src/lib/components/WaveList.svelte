<script>    
    import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

    export let allWaves;
</script>
<h1 class="messageHeader">Messages</h1>
{#each allWaves || [] as wave (wave.timestamp) }
    <div class="message" 
        transition:scale|local={{ start: 0.7 }}
        animate:flip={{ duration: 200 }}>
        <div><strong>From: </strong>{wave.from}</div>
        <div><strong>At: </strong>{wave.timestamp.toString()}</div>
        <div><strong>Message: </strong>{wave.message}</div>
    </div>
{/each}