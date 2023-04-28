const { ethers, hre, artifacts } = require("hardhat");

async function main() {
  const [deployer,per1,per2] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

 // Get the ContractFactories and Signers here.
  const stakingBiswap = await ethers.getContractFactory("stakingBiswap");
  const stake = await stakingBiswap.deploy();
  console.log(
      "stake",stake.address
  ); 

    const vitalik_address = "0xB8A6F44fDD902627A578876ab9fEdCC1F244eDA8";
    const addressTo = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
  
    //  impersonating vitalik's account
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [vitalik_address],
    });
  
    //   make vitalik the signer
    const signer = await ethers.getSigner(vitalik_address);
  
    console.log(
      "Vitalik account before transaction",
      ethers.utils.formatEther(await signer.getBalance())
    );
  
    //   create  transaction
    const tx = {
      to: deployer.getBalance(),
      value: ethers.utils.parseEther("1"),
    };
  
    const recieptTx = await signer.sendTransaction(tx);
  
    await recieptTx.wait();
  
    console.log(`Transaction successful with hash: ${recieptTx.hash}`);
    console.log(
      "Vitalik account after transaction",
      ethers.utils.formatEther(await signer.getBalance())
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
