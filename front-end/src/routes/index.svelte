<script>
    import { onMount } from 'svelte';
    import { checkIfWalletIsConnected, readWaves, addNewWaveEventListner } from '$lib/helper/wavePortalHelper';

    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import SendWave from '$lib/components/SendWave.svelte';
    import WaveList from '$lib/components/WaveList.svelte';

    let currentAccount;
    let allWaves = [];
    
    onMount(async () => {
		currentAccount = await checkIfWalletIsConnected();

        if (currentAccount != null) {
            allWaves = await readWaves();
        }
        addNewWaveEventListner(onNewWave);
	});

    function onNewWave(from, message, timestamp) {
        try {            
            let wave = {
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

<style>
    .mainContainer {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 64px;
    }

    .dataContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 600px;
        margin-top: 32px;
        margin-bottom: 10px;
    }
</style>