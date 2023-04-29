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
    // await res.transfer(deployer.address,"8643718239731596280347")
  
    let bal = await res.balanceOf(deployer.address);
    console.log("hi",bal);

    console.log(
      "Vitalik account after transaction",
      ethers.utils.formatEther(await signer.getBalance())
    );
  /////////here we Done this ////////////////
  
  ///trying to bypass the modifier of the contract ////////////
  let autoBsw = "0x97A16ff6Fd63A46bf973671762a39f3780Cda73D";//condition contract
  autoBswcontract= await ethers.getContractAt("autoBsw",autoBsw);
  let dep = ethers.utils.parseEther("1000000")
  await res.approve(autoBsw,dep);
  await autoBswcontract.connect(signer).deposit(dep);
  console.log("Deposit Done ");
    //check the 
  // let amp = await autoBswcontract.userInfo(vitalik_address);
  // console.log("this is ",amp);

    /////trying to call biswap ///////
    let contract ="0xB8A6F44fDD902627A578876ab9fEdCC1F244eDA8";//TokenAddress
    Bcontract= await ethers.getContractAt("SmartChefV2",contract);
    // let amount = ethers.utils.parseEther("501")
    // const res2 = await Bcontract.connect(signer);
    // const rese = await res2.stake(amount);
    let addr = "0xaA303F99d41f8483EC8357d8FA75Dd990040015c";
    const signer3 = await ethers.getSigner(addr);
    let temp = await Bcontract.getHolderPoolAmount(signer3.address);//this is check persontage
    console.log("this is temp amoutn ",temp) 



  //// call stack functions ////////////////
  // let amount = ethers.utils.parseEther("10")
  // await swap.approve(stake.address,amount)
  // console.log("Approve Done");
  // await stake.stakeToken(amount);



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
