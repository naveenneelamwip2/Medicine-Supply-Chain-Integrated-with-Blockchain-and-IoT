require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require('@nomicfoundation/hardhat-ignition')
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    fontomtest: {
      url: process.env.provider_url,
      accounts: [`0x${process.env.provider_key}`]
    }
  }
};
