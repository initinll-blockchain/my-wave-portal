const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

  /*
   * Get Total Waves
   */
  let waveCount = await waveContract.getTotalWaves();
  console.log("Wave Count:", waveCount.toNumber());

  /*
   * Send Wave
   */
  let waveTxn = await waveContract.wave("A message 1 !");
  await waveTxn.wait();

  waveTxn = await waveContract.wave("A message 2 !");
  await waveTxn.wait();

  /*
   * Send Another Wave
   */
  waveTxn = await waveContract.connect(randomPerson).wave("Another message !");
  await waveTxn.wait();

  /*
   * check Contract balance
   */
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

  /*
   * Get Total Waves
   */
  waveCount = await waveContract.getTotalWaves();
  console.log("Wave Count:", waveCount.toNumber());

  /*
   * Get All Waves
   */
  let allWaves = await waveContract.getAllWaves();
  console.log("All Waves:", allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();