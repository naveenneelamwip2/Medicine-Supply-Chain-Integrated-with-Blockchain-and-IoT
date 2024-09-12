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
   git clone https://github.com/your-username/blockchain-medicine-delivery.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure your blockchain network (e.g., Ethereum testnet or private network).

4. Deploy smart contracts:
   ```
   truffle migrate
   ```

## Usage
1. Start the IoT devices (simulated or physical).
2. Run the application:
   ```
   node app.js
   ```

## License
This project is made as POC and licensed under the [Wipro Limited](LICENSE).


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
