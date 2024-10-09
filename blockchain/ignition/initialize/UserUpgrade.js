const { ethers, upgrades } = require("hardhat");

async function init() {
    const UserV2 = await ethers.getContractFactory('User');
    console.log('Upgrading User...');
    await upgrades.upgradeProxy(process.env.user_contract, UserV2);
    console.log('User upgraded');

    const user = await UserV2.attach(process.env.user_contract);

    // Verify old data
    console.log(`Verifying old data`);
    const emailId = "naveenhardhatdeployment@gmail.com";
    const userCid = "unrealcidhardhatdeployment";
    const retrievedCid = await user.getUserCid(emailId);
    console.log(`Retrieved CID for ${emailId}: ${retrievedCid}`);
    if(userCid === retrievedCid){
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