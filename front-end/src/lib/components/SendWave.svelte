<script lang="ts">    
    import { connectWallet, writeWave } from '$lib/services/wavePortalService';
    
    export let account: string;
    let message: string; 

    async function connect(): Promise<void> {
        try {
            account = await connectWallet();
        } catch (error) {
            console.log("Connect Error", error);
            if (error.message !== undefined) {
                alert("Error - " + error.message);    
            }
            else {
                alert("Error - " + error);    
            }  
        }
    }

    async function wave(): Promise<void> {
        try {
            console.log("message", message);
            await writeWave(message);
            message = '';
        } catch (error) {
            console.log("Wave Error", error);
            if (error.message !== undefined) {
                alert("Error - " + error.message);    
            }
            else {
                alert("Error - " + error);    
            }  
        }
    }
</script>

{#if account == null}
    <div class="dataContainer">
        <button class="waveButton" on:click={connect}>Connect Wallet</button>
    </div>
{:else}
    <div class="dataContainer">
        <input class="waveMessage" type="text" placeholder=" your message here..." bind:value={message} />
        <button class="waveButton" disabled='{typeof message === 'undefined' || message === ''}' on:click="{wave}">Wave at Me</button>
    </div>
{/if}

<style>
    .waveButton {
        cursor: pointer;
        margin-top: 16px;
        padding: 16px;    
        border-radius: 10px;
        border: 2px solid black;
        font-size: 15px;    
        color: var(--accent-color);
        background-color: var(--secondary-color);
    }

    .waveButton:hover {
        background-color: #b2c8dd;
    }

    .waveMessage {
        font-size: 25px;
        width: 100%;
        padding: 0.5em 1em 0.3em 1em;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid var(--accent-color);
        border-radius: 10px;
        text-align: center;
    }

    .waveMessage:focus-visible {
        box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
        border: 2px solid #ff3e00 !important;
        outline: none;
    }
</style>