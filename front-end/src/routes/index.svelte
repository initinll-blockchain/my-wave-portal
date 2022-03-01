<script lang="ts">
    import '../app.css';       

    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import SendWave from '$lib/components/SendWave.svelte';
    import WaveList from '$lib/components/WaveList.svelte';       
</script>

<div class="mainContainer">
    <div class="dataContainer">      
      <Header />
      <SendWave />      
      <WaveList />
      <Footer />
    </div>
</div>