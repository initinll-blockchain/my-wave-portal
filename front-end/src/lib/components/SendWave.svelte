<script>    
    import { connectWallet, writeWave } from '$lib/helper/wavePortalHelper';
    
    export let currentAccount;
    let message; 

    async function connect() {
        currentAccount = await connectWallet();
    }

    async function wave() {
        console.log("message", message);
        message = await writeWave(message);
    }
</script>

{#if currentAccount == null}
    <div class="dataContainer">
        <button class="waveButton" on:click={connect}>Connect Wallet</button>
    </div>
{:else}
    <div class="dataContainer">
        <input type="text" placeholder=" your message here..." bind:value={message} />
        <button class="waveButton" disabled='{typeof message === 'undefined' || message === ''}' on:click="{wave}">Wave at Me</button>
    </div>
{/if}