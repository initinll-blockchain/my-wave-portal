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

<style>
    .dataContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 600px;
        margin-top: 32px;
        margin-bottom: 10px;
    }

    .waveButton {
        cursor: pointer;
        margin-top: 16px;
        padding: 16px;
        border: 0;
        border-radius: 10px;
        font-size: 15px;
        color: purple;
    }
</style>