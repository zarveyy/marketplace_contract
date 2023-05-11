async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Déploiement du contrat par:', deployer.address);
  
    const ContractFactory = await ethers.getContractFactory('VotreContrat'); // Remplacez 'VotreContrat' par le nom de votre contrat
    const contract = await ContractFactory.deploy();
  
    console.log('Contrat déployé à l\'adresse:', contract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });