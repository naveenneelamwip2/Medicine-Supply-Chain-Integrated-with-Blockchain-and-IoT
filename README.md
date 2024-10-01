# Medicine Supply Chain Integrated with Blockchain and IoT
## Introduction
Truthfulness of data is essential in every supplychain application hence this project contains a blockchain application designed to enhance the transparency and security of drug supply chain management. By integrating Internet of Things (IoT) devices, we ensure real-time and accurate tracking of drug delivery processes—from production to final delivery.

## Features
1. **Blockchain Integration**:
   - We utilize a decentralized blockchain network (such as Ethereum) to record drug-related transactions securely.
   - Smart contracts enable automated execution of predefined rules, ensuring transparency and immutability.

2. **IoT Sensors and Devices**:
   - IoT devices (sensors, RFID tags, QR codes) are deployed at various stages of the drug supply chain.
   - These devices capture data related to temperature, location, handling, and other relevant parameters.

3. **Real-Time Monitoring**:
   - Our system continuously monitors drug shipments, providing real-time updates to stakeholders.
   - Alerts are triggered if deviations occur (e.g., temperature fluctuations, unexpected delays).

4. **Immutable Records**:
   - Each drug movement is recorded on the blockchain, creating an auditable history.
   - Participants (manufacturers, distributors, pharmacies) can verify the authenticity of drugs.

5. **Secure Authentication**:
   - Participants access the system using cryptographic keys.
   - Only authorized parties can read or write data to the blockchain.

## Installation
1. Clone this repository:
   ```
   git clone https://github.com/naveenneelamwip2/Medicine-Supply-Chain-Integrated-with-Blockchain-and-IoT.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure your blockchain network (e.g., Ethereum testnet or private network).

4. Deploy smart contracts:
   ```
   npx hardhat run .\blockchain\ignition\initialize\User.js --network fontomtest
   npx hardhat run .\blockchain\ignition\initialize\Medicine.js --network fontomtest

   Please run this in powershell if any TLS cert error in local: $env:NODE_TLS_REJECT_UNAUTHORIZED=0
   ```

## Usage
1. Start the IoT devices (simulated or physical).
2. Run the front end application:
   ```
   npm run build
   npm run start
   ```
3. Run the backend application:
   ```
   npm run start
   npm run start:dev :::> To run in watch mode
   ```
## License
This project is made as POC and licensed under the [Wipro Limited](LICENSE).
