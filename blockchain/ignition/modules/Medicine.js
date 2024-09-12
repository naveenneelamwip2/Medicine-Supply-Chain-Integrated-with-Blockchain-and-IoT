const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers, upgrades } = require("hardhat");

module.exports = buildModule("MedicineTrackingModule", (m) => {
  const medicineContractDeployment = m.contract("MedicineTracking", [], {});

  // let medicineContractDeployment;
  // async function main() {
  //   const MedicineTracking = await ethers.getContractFactory("MedicineTracking");
  //   medicineContractDeployment = await upgrades.deployProxy(MedicineTracking, []);
  //   await medicineContractDeployment.waitForDeployment();
  //   console.log("medicineContractDeployment: ", medicineContractDeployment);
  //   console.log("MedicineTracking deployed to:", await medicineContractDeployment.getAddress());
  // }

  // main();

  return { medicineContractDeployment };
});
