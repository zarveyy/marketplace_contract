window.addEventListener('load', async () => {
  if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
  } else {
      window.web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.matic.network'));
  }

  const contractAddress = '0x6313d59e5B4985727254FADF654E3A641F33Ea8c'; // Remplacez par l'adresse du contrat déployé
  const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "MissionComplete",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "MATIC_PRICE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Status",
		"outputs": [
			{
				"internalType": "enum Marketplace.ShippingStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "delivered",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStatus",
		"outputs": [
			{
				"internalType": "enum Marketplace.ShippingStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "shipped",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "status",
		"outputs": [
			{
				"internalType": "enum Marketplace.ShippingStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Remplacez par l'ABI du contrat
  const contract = new window.web3.eth.Contract(abi, contractAddress);
  const accounts = await window.web3.eth.getAccounts();

  const checkStatusButton = document.getElementById('checkStatus');
  const statusElement = document.getElementById('status');
  const shipButton = document.getElementById('ship');
  const deliverButton = document.getElementById('deliver');
  const connectButton = document.getElementById('connectButton');
  const ShippingStatus = {
    0: 'Unknown',
    1: 'Shipped',
    2: 'Delivered',
  };

checkStatusButton.addEventListener('click', async () => {
    const statusValue = await contract.methods.Status().call({ from: accounts[0], value: web3.utils.toWei('0.01', 'ether') });
    console.log("statusValue: ", statusValue); 
    statusElement.innerText = `Statut de la commande : ${ShippingStatus[statusValue]}`;
});

  

  shipButton.addEventListener('click', async () => {
      await contract.methods.shipped().send({ from: accounts[0] });
      alert('Statut mis à jour : Expédié');
  });

  deliverButton.addEventListener('click', async () => {
      await contract.methods.delivered().send({ from: accounts[0] });
      alert('Statut mis à jour : Livré');
  });

  connectButton.addEventListener('click', async () => {
      if (window.ethereum) {
          try {
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              alert('Connexion avec MetaMask réussie');
          } catch (error) {
              console.error('Erreur lors de la connexion avec MetaMask:', error);
          }
      } else {
          alert('MetaMask n\'est pas installé.');
      }
  });
});