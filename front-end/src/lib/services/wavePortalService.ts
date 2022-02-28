import { Contract, ethers, Signer, type ContractInterface, type ContractTransaction } from 'ethers';
import abi from '$lib/abi/WavePortal.json';
import { Constants } from '$lib/helpers/Constants';
import type { Wave } from '$lib/types/Wave';

declare const window: any;

export function getContractAddress() {    
    return Constants.CONTRACT_ADDRESS_LOCALHOST;
}

export async function checkIfWalletIsConnected(): Promise<string> {
    let account:string;

    try {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }

        const accounts: string[] = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
            account = accounts[0];
            console.log("Found an authorized account:", account);
            return account;            
        } else {
            console.log("No authorized account found")
        }
    } catch (error) {
        throw error;
    }
}

export async function connectWallet(): Promise<string> {
    let account:string;

    try {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Make sure you have metamask!");
            return;
        }

        const accounts: string[] = await ethereum.request({ method: "eth_requestAccounts" });

        if (accounts.length !== 0) {
            account = accounts[0];
            console.log("Found an authorized account:", account);
            return account;            
        } else {
            console.log("No authorized account found")
        }     
    } catch (error) {
        throw error;
    }
}

function getContract(): Contract {
    try {
        const { ethereum } = window;                
        let contractABI: ContractInterface = abi.abi;
        let wavePortalContract: Contract;

        if (ethereum) {
            const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(ethereum);
            const signer: Signer = provider.getSigner();
            let contractAddress: string = getContractAddress();
            wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
            console.log("wavePortalContract", wavePortalContract.address);
        }
        return wavePortalContract;
    } catch (error) {
        console.log("getContract", error);
    }
}

export async function writeWave(message: string): Promise<void> {
    try {
        let wavePortalContract = getContract();
        
        if (wavePortalContract) {
            /** Writing data to Blockchain **/
            const waveTxn: ContractTransaction = await wavePortalContract.wave(message, { gasLimit: 300000 });
            console.log("Mining...", waveTxn.hash);

            await waveTxn.wait();
            console.log("Mined -- ", waveTxn.hash);
        }
    } catch (error) {
        throw error;
    }
}

export async function readWaves(): Promise<Wave[]> {
    try {
        let wavePortalContract = getContract();

        if (wavePortalContract) {
            /** Reading data from Blockchain **/
            const count:number = await wavePortalContract.getTotalWaves();

            if (count) {
                console.log("Retrieved total wave count - ", count);
            }

            let allWaves: Wave[] = await wavePortalContract.getAllWaves();

            if (allWaves) {
                console.log("All Waves -");
                console.log(allWaves);
                return allWaves;
            }
        }
    } catch (error) {
        throw error;
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

export function removeNewWaveEventListner(onNewWave) {
    try {        
        let wavePortalContract = getContract();

        if (wavePortalContract) {
            wavePortalContract.off("NewWave", onNewWave);
        }
    } catch (error) {
        console.log("addNewWaveEventListner", error);
    }
}