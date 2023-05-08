import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import React, { useEffect, useState } from 'react';
import { Withdraw } from './components/Withdraw';
import { Staking } from './components/Staking';
import { ethers} from "ethers";
import dexAddress from "./contractsData/stakingBiswap-address.json"
import dexAbi from "./contractsData/stakingBiswap.json"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '5px solid #212121',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};


const { ethereum } = window;
function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [dex, setDex] = useState({})

  
  ethereum.on("accountsChanged", async (account) => {
    setAccount(account[0]);
    window.location.reload()
  })

  const changeNetwork = async () => {
    try {
      setLoading(true)
      if (!ethereum) throw new Error("No crypto wallet found");
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{
          chainId: "0x7A69"
          //  chainId: "0x5"
        }]
      });
      await web3Handler();
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err.message);
    }
  };
  window.ethereum && ethereum.on("chainChanged", async () => {
    window.location.reload();
  });

  const checkIsWalletConnected = async () => {  
    try {
      if (!ethereum) return alert("please install MetaMask");
      const accounts = await ethereum.request({ method:"eth_accounts" });
      if (accounts.length) {
        setAccount(accounts[0]);
        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // Set signer
        const signer = provider.getSigner()
        loadContracts(signer)
      } else {
        console.log("No account Found");
      }
    } catch (err) {

      throw new Error("No ethereum Object");
    }
  }

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method:'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
}

const loadContracts = async (signer) => {
  // Get deployed copies of contracts
  const dex = new ethers.Contract(dexAddress.address, dexAbi.abi, signer)
  setDex(dex)
    setLoading(false)
}
  useEffect(() => {
    checkIsWalletConnected();
  }, [])




  return (
    <div className="App">
      <Header web3Handler={changeNetwork} account={account}/>
       <div className="container mrgnbtm" id="grid">
        <div className="row-md-5" style={{ "paddingTop": 20 }}>
          <Staking web3Handler={web3Handler} dex={dex} account={account}/>
        </div>
        <div className="row-md-5" style={{ "paddingTop": 20 }}>
          <Withdraw checkIsWalletConnected={checkIsWalletConnected} dex={dex} account={account} />        
        </div>
        </div>


        
        {/* <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography sx={{
                fontWeight: '900'
              }} id="modal-modal-title" variant="h6" component="h2">
                Available Endpoints
              </Typography>
              <Typography sx={{
                fontWeight: 'bolder'
              }} id="modal-modal-description" >
                {endPs}
              </Typography>
            </Box>
          </Modal>
        </div> */}
        {/* <div>
          <Modal
            open={openActW}
            onClose={handleActWClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography sx={{
                fontWeight: 'bolder'
              }} id="modal-modal-title" variant="h6" component="h2">
                Available Endpoints
              </Typography>
              <Typography sx={{
                fontWeight: 'bolder'
              }} id="modal-modal-description" >
                {actRes}
              </Typography>
            </Box>
          </Modal>
        </div> */}
      </div>
  );
}


export default App;
