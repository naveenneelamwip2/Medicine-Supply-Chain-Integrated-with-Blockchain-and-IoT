const { ethers, upgrades } = require("hardhat");

async function init() {
    const Medicine = await ethers.getContractFactory("Medicine");
    console.log("Deploying Medicine...");
    const medicine = await upgrades.deployProxy(Medicine, [], { initializer: 'initialize' });
    await medicine.waitForDeployment();
    
    console.log("Medicine deployed to:", await medicine.getAddress());

    const [owner] = await ethers.getSigners();
    const userCid = "unrealcidhardhatdeployment";
    const medicineId = "fqijisiafdapck";
    const medicineCid = "medicineunrealcidhardhatdeployment";
    let tx = await medicine.connect(owner).addMedicine(userCid, medicineId, medicineCid);
    await tx.wait();
    console.log(`Medicine added: ${userCid} -> ${medicineId}`);
}

init()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
    });

// const [owner, addr1, addr2] = await ethers.getSigners();
// const hardhatToken = await ethers.deployContract("Medicine");
// await hardhatToken.waitForDeployment();
// console.log("hardhatToken: ", hardhatToken);
// let tx = await hardhatToken.initialize()
// await tx.wait();
// console.log("tx: ", tx);
// let conOwner = await hardhatToken.owner();
// console.log("hardhatToken.owner,owner: ", conOwner, owner.address)