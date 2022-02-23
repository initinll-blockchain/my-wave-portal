import { ethers } from 'ethers';
import abi from '$lib/abi/WavePortal.json';
import { CONTRACT_ADDRESS_LOCALHOST } from '$lib/helper/constants';

export function getContractAddress() {    
    return CONTRACT_ADDRESS_LOCALHOST;
}

export async function checkIfWalletIsConnected() {
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
            return account;            
        } else {
            console.log("No authorized account found")
        }
    } catch (error) {
        console.log("checkIfWalletIsConnected", error);
    }
}

export async function connectWallet() {
    try {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Make sure you have metamask!");
            return;
        }

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            return account;            
        } else {
            console.log("No authorized account found")
        }     
    } catch (error) {
        console.log("connectWallet", error)
    }
}

function getContract() {
    try {
        const { ethereum } = window;                
        let contractABI = abi.abi;
        let wavePortalContract;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            let contractAddress = getContractAddress();
            wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
            console.log("wavePortalContract", wavePortalContract.address);
        }
        return wavePortalContract;
    } catch (error) {
        console.log("getContract", error);
    }
}

export async function writeWave(message) {
    try {
        let wavePortalContract = getContract();
        
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

export async function readWaves() {
    try {
        let wavePortalContract = getContract();

        if (wavePortalContract) {
            /** Reading data from Blockchain **/
            const count = await wavePortalContract.getTotalWaves();

            if (count) {
                console.log("Retrieved total wave count - ", count.toNumber());
            }

            let allWaves = await wavePortalContract.getAllWaves();

            if (allWaves) {
                console.log("All Waves -");
                console.log(allWaves);
                return allWaves;
            }
        }
    } catch (error) {
        console.log("readWaves", error);
    }
}

export function addNewWaveEventListner(onNewWave) {
    try {        
        let wavePortalContract = getContract();

        if (wavePortalContract) {
            wavePortalContract.on("NewWave", onNewWave);
        }
    } catch (error) {
        console.log("addNewWaveEventListner", error);
    }
}