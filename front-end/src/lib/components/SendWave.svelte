<script lang="ts">    
    import { onDestroy, onMount } from 'svelte';

    import type { Wave } from '$lib/types/Wave';
    import { WaveStore } from '$lib/stores/WaveStore';    
    import { connectWallet, writeWave, addNewWaveEventListner, removeNewWaveEventListner } from '$lib/services/WavePortalService';
    
    export let account: string;
    let message: string; 

    onMount(() => {
        addNewWaveEventListner(onNewWave);
    });

    onDestroy(()=> {
        removeNewWaveEventListner(onNewWave);
    });

    async function connect(): Promise<void> {
        try {
            account = await connectWallet();
        } catch (error) {
            console.log("SendWave Connect Error", error);
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
            await writeWave(message);
            message = '';
        } catch (error) {
            console.log("SendWave Wave Error", error);
            if (error.message !== undefined) {
                alert("Error - " + error.message);    
            }
            else {
                alert("Error - " + error);    
            }  
        }
    }

    function onNewWave(from: string, message: string, timestamp: string) {
        try {            
            const wave: Wave = {
                from,
                message,
                timestamp
            }

            WaveStore.update((waves:Wave[]) => {
                if (waves !== undefined && waves.length > 0) {
                    let ifWaveExists: boolean = waves.some(w => parseInt(w.timestamp) === parseInt(wave.timestamp));            
                    if (!ifWaveExists) {
                        return [wave, ...waves];
                    }
                }
            });            
        } catch (error) {
            console.log("SendWave OnNewWave Error", error);
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