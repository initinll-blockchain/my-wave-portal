<script>    
    export let allWaves;
</script>

{#each allWaves || [] as wave }
    <div class="waveMessage">
        <div>From: {wave.from}</div>
        <div>At: {wave.timestamp.toString()}</div>
        <div>Message:{wave.message}</div>
    </div>
{/each}