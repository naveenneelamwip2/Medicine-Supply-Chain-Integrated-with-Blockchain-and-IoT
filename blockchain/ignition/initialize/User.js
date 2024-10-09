const { ethers, upgrades } = require("hardhat");

async function init() {
    const User = await ethers.getContractFactory("User");
    console.log("Deploying User...");
    const user = await upgrades.deployProxy(User, [], { initializer: 'initialize' });
    await user.waitForDeployment();
    
    console.log("User deployed to:", await user.getAddress());

    const [owner] = await ethers.getSigners();
    const emailId = "naveenhardhatdeployment@gmail.com";
    const userCid = "unrealcidhardhatdeployment";
    let tx = await user.connect(owner).addUser(emailId, userCid);
    await tx.wait();
    console.log(`User added: ${emailId} -> ${userCid}`);

}

init()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
    });


// Basic contract deployment
// const [owner, addr1, addr2] = await ethers.getSigners();
// const hardhatToken = await ethers.deployContract("User");
// await hardhatToken.waitForDeployment();
// console.log("hardhatToken: ", hardhatToken);
// let tx = await hardhatToken.initialize()
// await tx.wait();
// console.log("tx: ", tx);
// let conOwner = await hardhatToken.owner();
// console.log("hardhatToken.owner,owner: ",conOwner,owner.address)