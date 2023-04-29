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

  //////////// impersonating the walllet address //////////////////////
    const vitalik_address = "0x8894e0a0c962cb723c1976a4421c95949be2d4e3";
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
      to: deployer.getAddress(),
      value: ethers.utils.parseEther("1"),
    };
    const recieptTx = await signer.sendTransaction(tx);
    await recieptTx.wait();

    let bwap ="0x965F527D9159dCe6288a2219DB51fc6Eef120dD1";//TokenAddress
    swap= await ethers.getContractAt("BSWToken",bwap);
    const res = await swap.connect(signer);
    await res.transfer(deployer.address,"8643718239731596280347")
  
    let bal = await res.balanceOf(deployer.address);
    console.log("hi",bal);

    console.log(
      "Vitalik account after transaction",
      ethers.utils.formatEther(await signer.getBalance())
    );
  /////////here we Done this ////////////////
  
  //// call stack functions ////////////////
  await stake.stakeToekn("10000000000000000000000");



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
