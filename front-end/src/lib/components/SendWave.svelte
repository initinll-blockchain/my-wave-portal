<script lang="ts">    
    import { connectWallet, writeWave } from '$lib/services/wavePortalService';
    
    export let currentAccount: string;
    let message: string; 

    async function connect(): Promise<void> {
        try {
            currentAccount = await connectWallet();
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