const { expect } = require("chai");

describe("WavePortal", async function () {    

    it("Should return contract balance as 0.1", async function(){
        const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
        const waveContract = await waveContractFactory.deploy({
            value: hre.ethers.utils.parseEther("0.1"),
        });
        await waveContract.deployed();

        let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

        expect(contractBalance).to.equal(hre.ethers.utils.parseEther("0.1"));
    });

    it("Should return wave count as 0", async function(){
        const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
        const waveContract = await waveContractFactory.deploy({
            value: hre.ethers.utils.parseEther("0.1"),
        });
        await waveContract.deployed();
        
        let waveCount = await waveContract.getTotalWaves();        

        expect(waveCount).to.equal(0);
    });

    it("Should return wave count as 1", async function(){
        const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
        const waveContract = await waveContractFactory.deploy({
            value: hre.ethers.utils.parseEther("0.1"),
        });
        await waveContract.deployed();

        let waveTxn = await waveContract.wave("Hello");
        await waveTxn.wait();

        let waveCount = await waveContract.getTotalWaves();        

        expect(waveCount).to.equal(1);
    });

    it("Should return Hello as message", async function(){
        const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
        const waveContract = await waveContractFactory.deploy({
            value: hre.ethers.utils.parseEther("0.1"),
        });
        await waveContract.deployed();

        let waveTxn = await waveContract.wave("Hello");
        await waveTxn.wait();

        let allWaves = await waveContract.getAllWaves();

        expect(allWaves[0].message).to.equal("Hello");
    });

    it("Should emit event", async function(){
        const [owner] = await hre.ethers.getSigners();
        const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
        const waveContract = await waveContractFactory.deploy({
            value: hre.ethers.utils.parseEther("0.1"),
        });
        await waveContract.deployed();
        
        await expect(waveContract.wave("Hello")).to.emit(waveContract, "NewWave");
    });

});