const { ethers, hre, artifacts } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  
 // Get the ContractFactories and Signers here.
  const stakingBiswap = await ethers.getContractFactory("stakingBiswap");
  // deploy contracts
  const stake = await stakingBiswap.deploy();
  console.log(
      "stake",stake.address
  ); 
  

  //   ////contract verify scripts ///////////////////
  // await nft.deployTransaction.wait(5);

  // await hre.run(`verify:verify`, {
  //   address: nft.address,
  //   constructorArguments: []
  // });


  //   ////contract verify scripts ///////////////////
  // await Token.deployTransaction.wait(5);

  // await hre.run(`verify:verify`, {
  //   address: Token.address,
  //   constructorArguments: []
  // });

  //   ////contract verify scripts ///////////////////
  //   await marketplace.deployTransaction.wait(5);

  //   await hre.run(`verify:verify`, {
  //     address: marketplace.address,
  //     constructorArguments: [deployer.address,Token.address]
  //   });


  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(stake , "stakingBiswap");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/src/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);
  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
