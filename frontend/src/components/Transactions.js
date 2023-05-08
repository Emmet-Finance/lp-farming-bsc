const Web3 = require('web3');
require('dotenv').config();
const Box = require('../contractsData/SmartChefV2.json');
const { ethers, utils } = require('ethers');
const TokenAbi = require('../contractsData/BSWToken.json');


// const AlchamyURI = "https://wiser-wider-valley.bsc.discover.quiknode.pro/050ea5d25ccade9d764fac15bd4709b810d543a1/"; 
const AlchamyURI="http://127.0.0.1:8545/"; 

//Hard way (web3#signTransaction() + web3#sendSignedTransaction())

// const init = async () => {
//   const CONTRACT_ADDRESS = "0xB8A6F44fDD902627A578876ab9fEdCC1F244eDA8";
//     const CONTRACT_ABI = [Box];
//     let wallet ="0x321ebe91422cfd7f03e40b7536e431434555def8";    
//     // await network.provider.request({
//     //   method: "hardhat_impersonateAccount",
//     //   params: [wallet],
//     // });
//     const signer3 = await ethers.Signer(wallet);
//     let amount = ethers.utils.parseEther("10")
//     await contract.methods.stake(amount).send({
//         from: signer3,
//       });

//       console.log("Stake call");
//   const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//  // console.log(`Transaction hash: ${receipt.transactionHash}`);
//  // console.log(`New data value: ${await myContract.methods.x().call()}`);
// }
// init();

// require('dotenv').config()
// const { API_URL, PRIVATE_KEY } = process.env;
// const key =process.env.PRIVATE_KEY;
// const url =process.env.API_URL;
// const url =process.env.API_URL;



// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(url);

async function main() {
  const web3 = new Web3(AlchamyURI);          
    const myAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' //TODO: replace this address with your own public address
   
    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0
   
    
    const CONTRACT_ADDRESS = "0xB8A6F44fDD902627A578876ab9fEdCC1F244eDA8";
    // const CONTRACT_ABI = Box;

    const contract = new web3.eth.Contract(Box.abi,CONTRACT_ADDRESS);

   
// Call the function and send the arguments
let amount = ethers.utils.parseEther("10")

const tx = await contract.methods.stake(amount).send({
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // sender address
  gasPrice: '1000000000', // gas price in wei
  gas: '200000' // gas limit
})

    // const transaction = {
    //  'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // faucet address to return eth
    //  'value': 100,
    //  'gas': 30000,
    //  'maxFeePerGas': 1000000108,
    //  'nonce': nonce,
    //  // optional data field to send message or execute smart contract
    // };

    console.log('Transaction hash:', tx.transactionHash)
    //const signedTx = await web3.eth.accounts.signTransaction(tx,"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
    
  //   web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
  //   if (!error) {
  //     console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
  //   } else {
  //     console.log("❗Something went wrong while submitting your transaction:", error)
  //   }
  //  });
}

main();