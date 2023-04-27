import React, { useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import { ethers } from "ethers";

export const Staking = ({web3Handler,dex, account }) => {
  const [Token, settoken] = useState(null);
  const [amount, setamount] = useState(null);
  const [endTime, setendTime] = useState(null)

  const staking = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const dextoken = await dex.tokens(Token)
  
    const Tokens = new ethers.Contract(dextoken, tokenCreation.abi, signer)
  
    await (await Tokens.approve(dex.address,amount)).wait();
    await dex.Staking(Token, amount, endTime);
    settoken("")
    setamount("")
    setendTime("")
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
          <button type="button" className="btn btn-primary sButton" > Stake Tokens</button>
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