window.addEventListener('load', async () => {
  if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
  } else {
      window.web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.matic.network'));
  }

  const contractAddress = '0xCONTRACT_ADDRESS'; // Remplacez par l'adresse du contrat déployé
  const abi = [/* ABI du contrat */]; // Remplacez par l'ABI du contrat
  const contract = new window.web3.eth.Contract(abi, contractAddress);
  const accounts = await window.web3.eth.getAccounts();

  const checkStatusButton = document.getElementById('checkStatus');
  const statusElement = document.getElementById('status');
  const shipButton = document.getElementById('ship');
  const deliverButton = document.getElementById('deliver');
  const connectButton = document.getElementById('connectButton');

  checkStatusButton.addEventListener('click', async () => {
      const statusValue = await contract.methods.getStatusForCustomer().send({ from: accounts[0], value: web3.utils.toWei('0.1', 'ether') });
      statusElement.innerText = `Statut de la commande : \${ShippingStatus[statusValue]}`;
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