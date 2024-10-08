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
    },    
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [`0x2f0e73ecae076ed675b3a368a9ebc3738fef8c438b1d491b23c40b95cd343c5d`]
    }
  }
};
