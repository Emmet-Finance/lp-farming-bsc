import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import dexAddress from "../contractsData/mohsinsDex-address.json"
import dexAbi from "../contractsData/mohsinsDex.json"
import {WithdrawBox} from "./WithdrawBox";

export const Withdraw = ({ dex , account}) => {
    const [stakeAmount, setStakeAmount] = useState([]);

    const WithdrawStakingTokens = async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const dex = new ethers.Contract(dexAddress.address, dexAbi.abi, signer)
     
    let id = await dex?.stakingId()
    let items = []
  
    for(let i=1; i<=id; i++){
        let stake = await dex.staking(i);
    
    if (stake.staker?.toString().toLowerCase() === account?.toString().toLowerCase()) {
            let stakes = await dex.staking(i);
          
            items.push(stakes)
          }
        }
     setStakeAmount(items) 
    } 
    
   
    
    useEffect(()=> {
        WithdrawStakingTokens();
    },[account])


    return(
        <div className="display-board">
            <h4> Withdraw Staking Tokens</h4>
            {stakeAmount.length > 0
                ? <div>
                  {stakeAmount?.map((items, idxx) => (
                    <div className='col'>
                      <WithdrawBox dex={dex} items={items} idxx={idxx} />
                    </div>
                  ))}</div>
                : "You Dont Stake Yet"
              }

            
            {/* <div className="btn" >
                <button type="button" className="btn btn-primary sButton" >Withdraw </button>
            </div> */}
        </div>
    )
}