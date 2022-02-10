<script>
    import { onMount } from 'svelte';

    var currentAccount;

    onMount(async () => {
		await checkIfWalletIsConnected();
	});

    async function checkIfWalletIsConnected() {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                currentAccount = account;
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log(error);
        }
  }
    
    async function connectWallet() {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected", accounts[0]);
            currentAccount = accounts[0];
        } catch (error) {
            console.log(error)
        }
    }
</script>

<div class="mainContainer">
    <div class="dataContainer">
      <div class="header">
        👋 Hey, I'm Nitin!
      </div>
      <div class="bio">
        I am .Net developer learning blockchain.
      </div>
      <div class="bio">         
        Connect your Ethereum wallet and wave at me!
      </div>
      {#if currentAccount == null}
        <div class="dataContainer">
            <button class="waveButton" on:click={connectWallet}>Connect Wallet</button>
        </div>   
      {:else}
        <div class="dataContainer">
            <button class="waveButton">Wave at Me</button>
        </div>   
      {/if}         
      <div class="bio">Deployed on Rinkeby at 0x06852D209C524c37EB7D328ED3d1571c773d9F99</div>
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

    .header {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    }

    .bio {
    text-align: center;
    color: gray;
    margin-top: 16px;
    }

    .waveMessage {
    margin-top: 16px;
    padding: 8px;
    border: 0;
    border-radius: 5px;
    
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