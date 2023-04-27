import React from 'react'

export const Header = ({ web3Handler, account }) => {

    return (


        <div className="header" style={{ marginRight: "100px" }}>
            {/* <div className="btn" style={{ marginRight: "100px" }} >
                {account ? (

                    <button className="btn btn-primary sButton">
                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                    </button>

                ) : (
                    <button onClick={web3Handler} className="btn btn-primary sButton">Connect Wallet</button>
                )}
            </div> */}
            <h1 style={{ marginRight: "100px" }}> Stacking Reward</h1>
        </div>

    )
}