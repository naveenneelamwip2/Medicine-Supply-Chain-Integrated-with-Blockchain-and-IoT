const { ethers, upgrades } = require("hardhat");

async function init() {
    const MedicineV2 = await ethers.getContractFactory('Medicine');
    console.log('Upgrading Medicine...');
    await upgrades.upgradeProxy(process.env.medicine_contract, MedicineV2);
    console.log('Medicine upgraded');

    const medicine = await MedicineV2.attach(process.env.medicine_contract);

    // Verify old data
    console.log(`Verifying old data`);
    const userCid = "unrealcidhardhatdeployment";
    const medicineId = "fqijisiafdapck";
    const medicineCid = "medicineunrealcidhardhatdeployment";
    const retrievedCid = await medicine.getMedicineHistory(userCid, medicineId);
    console.log(`Retrieved CID for ${medicineId} -  ${medicineCid}: ${retrievedCid}`);
    if(medicineCid === retrievedCid){
        console.log("Old data is existed in upgraded smart contract")
    } else {
        console.log("Not existed old data in upgraded smart contract")
    }
}

init()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
    });