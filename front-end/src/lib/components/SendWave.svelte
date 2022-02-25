<script lang="ts">    
    import { connectWallet, writeWave } from '$lib/services/wavePortalService';
    
    export let currentAccount: string;
    let message: string; 

    async function connect(): Promise<void> {
        currentAccount = await connectWallet();
    }

    async function wave(): Promise<void> {
        console.log("message", message);
        await writeWave(message);
        message = '';
    }
</script>

{#if currentAccount == null}
    <div class="dataContainer">
        <button class="waveButton" on:click={connect}>Connect Wallet</button>
    </div>
{:else}
    <div class="dataContainer">
        <input class="waveMessage" type="text" placeholder=" your message here..." bind:value={message} />
        <button class="waveButton" disabled='{typeof message === 'undefined' || message === ''}' on:click="{wave}">Wave at Me</button>
    </div>
{/if}