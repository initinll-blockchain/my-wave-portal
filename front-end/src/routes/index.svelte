<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    import { checkIfWalletIsConnected, readWaves, addNewWaveEventListner } from '$lib/services/wavePortalService';
    import type { Wave } from '$lib/types/wave';
    import { sort } from 'fast-sort';

    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import SendWave from '$lib/components/SendWave.svelte';
    import WaveList from '$lib/components/WaveList.svelte';

    let currentAccount: string;
    let allWaves: Wave[];
    let sortedWaves: Wave[];
    
    onMount(async () => {
        try {
            currentAccount = await checkIfWalletIsConnected();

            if (currentAccount != null) {
                allWaves = await (await readWaves());  
                sortedWaves = sort(allWaves).desc(w => parseInt(w.timestamp));
            }         
            addNewWaveEventListner(onNewWave);   
        } catch (error) {
            console.log("OnMount Error", error);
        }
	});    

    function onNewWave(from: string, message: string, timestamp: string) {
        try {            
            const wave: Wave = {
                from,
                message,
                timestamp
            }

            let ifWaveExists: boolean = allWaves.some(w => parseInt(w.timestamp) === parseInt(wave.timestamp));            

            if (!ifWaveExists) {
                allWaves = [...allWaves, wave];
                sortedWaves = sort(allWaves).desc(w => parseInt(w.timestamp));
                alert('New Message Recevied !');
            }
        } catch (error) {
            console.log("onNewWave", error);
            if (error.message !== undefined) {
                alert("Error - " + error.message);    
            }
            else {
                alert("Error - " + error);    
            }            
        }
    }
</script>

<div class="mainContainer">
    <div class="dataContainer">      
      <Header />
      <SendWave account={currentAccount} />      
      <WaveList waves={sortedWaves} />
      <Footer />
    </div>
</div>