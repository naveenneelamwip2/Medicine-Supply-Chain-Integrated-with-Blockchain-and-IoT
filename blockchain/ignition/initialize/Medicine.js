const { ethers, upgrades } = require("hardhat");

async function init() {
    if (process.env.target) {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const hardhatToken = await ethers.deployContract("MedicineTracking");

        await hardhatToken.waitForDeployment();

        console.log("hardhatToken: ", hardhatToken);

        let tx = await hardhatToken.initialize()

        // await tx.waitForDeployment();

        await tx.wait();

        console.log("tx: ", tx);

        let conOwner = await hardhatToken.owner();

        console.log("hardhatToken.owner,owner: ",conOwner,owner.address)

    }
}

init()