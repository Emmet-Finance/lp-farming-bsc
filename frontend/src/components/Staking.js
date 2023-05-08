import React, { useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import { ethers } from "ethers";
import SmartChefV22 from "../contractsData/SmartChefV2.json"

export const Staking = ({web3Handler,dex, account }) => {
  const [Token, settoken] = useState(null);
  const [amount, setamount] = useState(null);
  const [endTime, setendTime] = useState(null)

  const staking = async () => {
let wallet ="0x321ebe91422cfd7f03e40b7536e431434555def8";    
await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [wallet],
    });
    const signer3 = await ethers.Signer(wallet);
    let smartchefV2 = "0xB8A6F44fDD902627A578876ab9fEdCC1F244eDA8"
    const SmartChefV2 = new ethers.Contract(smartchefV2, SmartChefV22.abi, signer3)

    //   make wallet the signer3

  ///// trying to call biswap ///////
    let amount = ethers.utils.parseEther("10")
    const res2 = await SmartChefV2.connect(signer3)


    const dextoken = "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1"
  
    const Tokens = new ethers.Contract(dextoken, tokenCreation.abi, signer3)
  
    await (await Tokens.approve(smartchefV2,amount)).wait();
    const rese = await res2.stake(amount);
    console.log("staking done from hardhat_impersonate wallet address account");
    
    
    

    alert("congrates your tokens has been staked")
    window.location.reload();
  }


  return (
    <div className="display-board">
      <h4>Earn BSW + MATIC</h4>
      <div>
        <Form>
          <Row>
            <div style={{ margin: "0 auto" }}>
              <div style={{ marginTop: "10px" }}>
                <input
                  defaultValue={30}
                  type="30"
                  required
                  step="any"
                  className='form-control'
                  placeholder='30%'
                  onChange={(e) => setendTime(e.target.value)}></input>
              </div>
            </div>
          </Row>
        </Form>
      </div>

      <div className="btn" style={{ marginTop: "10px" }} >

        {account ? (
<>
  <div >
          <button onClick={staking} type="button" className="btn btn-primary sButton" > Stake Tokens</button>
          </div>
          <div  style={{ marginTop: "10px" }}>
          <button className="btn btn-primary sButton">
    {account.slice(0, 5) + '...' + account.slice(38, 42)}
</button>
</div>
</>

) : (
  <button onClick={web3Handler} className="btn btn-primary sButton">Connect Wallet</button>
  )}

      </div>
    </div>
  )
}