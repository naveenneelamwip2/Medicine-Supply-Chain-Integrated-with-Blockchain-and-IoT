const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers, upgrades } = require("hardhat");

module.exports = buildModule("UserModule", (m) => {
  const userContractDeployment = m.contract("User", [], {});
  
  // let userContractDeployment;
  // async function main() {
  //   try{
  //     console.log("UserModule Execution started");
  //     const User = await ethers.getContractFactory("User");
  //     userContractDeployment = await upgrades.deployProxy(User, []);
  //     console.log("userContractDeployment: ", userContractDeployment);
  //     await userContractDeployment.waitForDeployment();
  //     console.log("User deployed to:", await userContractDeployment.getAddress());
  //   } catch(err){
  //     console.log("err::::::::::: ",err)
  //   }

  // }

  // main();

  return { userContractDeployment };
});
