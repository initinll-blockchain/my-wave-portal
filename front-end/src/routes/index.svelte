<script>
    import { onMount, onDestroy } from 'svelte';
    import { ethers } from 'ethers';
    import abi from '../utils/WavePortal.json'

    let currentAccount;
    let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // "0xb970a61020e2Dee499Fc1E189696740ee6A73de6";
    let allWaves = [];
    let message = '';

    onMount(async () => {
		await checkIfWalletIsConnected();
        addNewWaveEventListner();
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
                /** Reading a wave message data from Blockchain **/
                await readWaves(ethereum);
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log("checkIfWalletIsConnected", error);
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
            /** Reading a wave message data from Blockchain **/
            await readWaves(ethereum);
        } catch (error) {
            console.log("connectWallet", error)
        }
    }

    async function wave() {
        try {
            const { ethereum } = window;

            if (ethereum) {
                /** Writing a wave message data to Blockchain **/
                await writeWave(ethereum, message);

                /** Reading a wave message data from Blockchain **/
                //await readWaves(ethereum);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log("wave", error);
        }
        message = '';
    }

    function getContract(ethereum) {
        try {
            let wavePortalContract;
            let contractABI = abi.abi;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
                console.log("wavePortalContract", wavePortalContract.address);
            }
            return wavePortalContract;
        } catch (error) {
            console.log("getContract", error);
        }
    }

    async function writeWave(ethereum, message) {
        try {
            let wavePortalContract = getContract(ethereum);

            if (wavePortalContract) {
                /** Writing data to Blockchain **/
                const waveTxn = await wavePortalContract.wave(message, { gasLimit: 300000 });
                console.log("Mining...", waveTxn.hash);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);
            }
        } catch (error) {
            console.log("writeWave", error);
        }
    }

    async function readWaves(ethereum) {
        try {
            let wavePortalContract = getContract(ethereum);

            if (wavePortalContract) {
                /** Reading data from Blockchain **/
                const count = await wavePortalContract.getTotalWaves();
                if (count) {
                    console.log("Retrieved total wave count - ", count.toNumber());
                }

                allWaves = await wavePortalContract.getAllWaves();
                if (allWaves) {
                    console.log("All Waves -");
                    console.log(allWaves);
                }
            }
        } catch (error) {
            console.log("readWaves", error);
        }
    }

    function onNewWave(from, message, timestamp) {
        try {
            let wave = {
                from,
                message,
                timestamp
            }
            allWaves = [...allWaves, wave];
        } catch (error) {
            console.log("onNewWave", error);
        }
    }

    function addNewWaveEventListner() {
        try {
            const { ethereum } = window;
            let wavePortalContract = getContract(ethereum);

            if (wavePortalContract) {
                wavePortalContract.on("NewWave", onNewWave);
            }
        } catch (error) {
            console.log("addNewWaveEventListner", error);
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
            <input type="text" placeholder=" your message here..." bind:value={message} />
            <button class="waveButton" disabled='{message === ''}' on:click="{wave}">Wave at Me</button>
        </div>
      {/if}
      {#each allWaves as wave }
        <div class="waveMessage">
            <div>From: {wave.from}</div>
            <div>At: {wave.timestamp.toString()}</div>
            <div>Message:{wave.message}</div>
        </div>
      {/each}
      <div class="bio">Deployed on Rinkeby at {contractAddress}</div>
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
        background-Color: Lavender;
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