require('@nomiclabs/hardhat-ethers');
require('hardhat-deploy');

module.exports = {
  networks: {
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: ['0xPRIVATE_KEY'], // Remplacez par votre clé privée
      chainId: 80001,
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  solidity: '0.8.4', // Remplacez par la version de Solidity que vous utilisez
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
