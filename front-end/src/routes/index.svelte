<script lang="ts">    
    import { onMount } from 'svelte';
    
    import '../app.css';    
    import { WaveStore } from "$lib/stores/WaveStore";
    import { checkIfWalletIsConnected, readWaves } from '$lib/services/WavePortalService';

    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import SendWave from '$lib/components/SendWave.svelte';
    import WaveList from '$lib/components/WaveList.svelte';

    let currentAccount: string;
        
    onMount(async () => {
        try {
            currentAccount = await checkIfWalletIsConnected();

            if (currentAccount != null) {
                let waves = await readWaves();

                WaveStore.update(() => {
                    return waves;
                });                
            }              
        } catch (error) {
            console.log("Index OnMount Error", error);
        }
	});    
</script>

<div class="mainContainer">
    <div class="dataContainer">      
      <Header />
      <SendWave account={currentAccount} />      
      <WaveList />
      <Footer />
    </div>
</div>