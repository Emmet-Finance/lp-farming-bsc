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
    const vitalik_address = "0x8894e0a0c962cb723c1976a4421c95949be2d4e3";       ///0x8894e0a0c962cb723c1976a4421c95949be2d4e3 it have bswap token
    //  impersonating vitalik's account                                         ///0xaA303F99d41f8483EC8357d8FA75Dd990040015c
    await network.provider.request({
      method: "hardhat_impersonateAccount",     
      params: [vitalik_address],
    });
    //   make vitalik the signer
    const signer = await ethers.getSigner(vitalik_address);

    let bwap ="0x965F527D9159dCe6288a2219DB51fc6Eef120dD1";//TokenAddress
    swap = await ethers.getContractAt("BSWToken",bwap);

    let signerToken = await swap.connect(signer).balanceOf(signer.address);
    console.log("signer tokens? ",signerToken); 
    await swap.connect(signer).transfer(stake.address,signerToken.toString());

    let tokenContract = await swap.balanceOf(stake.address);
    console.log("check Contract token after transfer",tokenContract);

  //////////// impersonating the walllet2 address //////////////////////
    const vitalik_address2 = "0x321ebe91422cfd7f03e40b7536e431434555def8";       ///0x8894e0a0c962cb723c1976a4421c95949be2d4e3 it have bswap token
    //  impersonating vitalik's account                                         ///0xaA303F99d41f8483EC8357d8FA75Dd990040015c //this have shares
    await network.provider.request({
      method: "hardhat_impersonateAccount",     
      params: [vitalik_address2],
    });
    //   make vitalik the signer
    const signer1 = await ethers.getSigner(vitalik_address2);

    let signer1Token = await swap.connect(signer1).balanceOf(signer1.address);
    console.log("signer1 tokens? ",signer1Token); 
    await swap.connect(signer1).transfer(stake.address,signer1Token.toString());

    let tokenContract1 = await swap.balanceOf(stake.address);
    console.log("check Contract token after transfer2",tokenContract1); 
  ///////// we Done this ////////////////
  
  /////trying to bypass the modifier of the contract ////////////
  let smartchefv2 ="0xB8A6F44fDD902627A578876ab9fEdCC1F244eDA8";//staking contract SmartChefV2
  let SmartChefV2 = await ethers.getContractAt("SmartChefV2",smartchefv2);
  
  let addr="0x321ebe91422cfd7f03e40b7536e431434555def8";            //0xaA303F99d41f8483EC8357d8FA75Dd990040015c this have balance 0x321ebe91422cfd7f03e40b7536e431434555def8
  const signer3 = await ethers.getSigner(addr);
  let temp = await SmartChefV2.getHolderPoolAmount(addr);           //this is check persontage
  console.log("this is temp amoutn ",temp)
  
  let autoBsw = "0x97A16ff6Fd63A46bf973671762a39f3780Cda73D";//condition contract
  autoBswcontract= await ethers.getContractAt("autoBsw",autoBsw);
  
  await stake.depositToBSW(tokenContract1.toString());
  console("successssssssss");
 
  // let dep = ethers.utils.parseEther("1000000")
  // await res.approve(autoBsw,dep);
  // await autoBswcontract.connect(signer).deposit(dep);
  // console.log("Deposit Done ");
  
  //check the 
  // let amp = await autoBswcontract.userInfo(vitalik_address);
  // console.log("this is ",amp);




    //////////// impersonating the walllet address //////////////////////
  
    //  impersonating vitalik's account
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [addr],
    });
    //   make vitalik the signer
    const signers = await ethers.getSigner(addr);
    console.log(
      "Vitalik account before transaction",
      ethers.utils.formatEther(await signers.getBalance())
    );
    //   create  transaction
    const txs = {
      to: deployer.getAddress(),
      value: ethers.utils.parseEther("1"),
    };
    const recieptTxs = await signers.sendTransaction(txs);
    await recieptTxs.wait();

  
    const ress = await swap.connect(signers);
    await ress.transfer(deployer.address,"1")
  
    let bals = await res.balanceOf(deployer.address);
    console.log("hi",bals); 

    console.log(
      "Vitalik account after transaction",
      ethers.utils.formatEther(await signer.getBalance())
    );
  /////////here we Done this ////////////////
  

  
  /////trying to call biswap ///////
    let amount = ethers.utils.parseEther("1")
    const res2 = await SmartChefV2.connect(signer3);
    const res3 = await swap.connect(signer3);
    //  await res3.approve(contract,amount);    //In this we stake amount on the direct contract 
    // const rese = await res2.stake(amount);
    console.log("Doneeeeeeeeeeee");

  ///////// Lets check stake in our contract //////////////
  const res4 = await stake.connect(signer3);
  await res3.approve(stake.address,amount);
  await res4.stakeToken(amount);
  
  console.log("check staked", await res2.stakedAmount(signer3.address));
  
  
  //agr eyh account shere krta hai apke account main token auto wale to ho sakta hai k apka accont stake kre


    // await deployer.sendTransaction({
  //   to: addr,
  //   value: ethers.utils.parseEther("1.0") // Sends exactly 1.0 ether
  // });


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
