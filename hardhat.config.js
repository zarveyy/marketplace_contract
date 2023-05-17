require('@nomiclabs/hardhat-ethers');
require('hardhat-deploy');
const fs = require('fs');

const secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));
const privateKey = secrets.privateKey;

module.exports = {
  networks: {
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [privateKey], // Remplacez par votre clé privée
      chainId: 80001,
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  solidity: '0.8.17', // Remplacez par la version de Solidity que vous utilisez
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
