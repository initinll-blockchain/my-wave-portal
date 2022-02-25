<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    import { checkIfWalletIsConnected, readWaves, addNewWaveEventListner } from '$lib/services/wavePortalService';
    import type { Wave } from '$lib/types/wave';

    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import SendWave from '$lib/components/SendWave.svelte';
    import WaveList from '$lib/components/WaveList.svelte';


    let currentAccount: string;
    let allWaves: Wave[] = [];
    
    onMount(async () => {
		currentAccount = await checkIfWalletIsConnected();

        if (currentAccount != null) {
            allWaves = await readWaves();
        }
        addNewWaveEventListner(onNewWave);
	});

    function onNewWave(from: string, message: string, timestamp: string) {
        try {            
            const wave: Wave = {
                from,
                message,
                timestamp
            }
            console.log("new wave", wave);
            allWaves = [...allWaves, wave];
        } catch (error) {
            console.log("onNewWave", error);
        }
    }
</script>

<div class="mainContainer">
    <div class="dataContainer">      
      <Header />
      <SendWave {currentAccount} />      
      <WaveList {allWaves} />
      <Footer />
    </div>
</div>