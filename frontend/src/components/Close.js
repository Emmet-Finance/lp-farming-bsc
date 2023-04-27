import React from 'react'

export const Close = ({close}) => {
    
    return(
        <div className="display-board">

            <h4>Close Pool</h4>
            <div className="btn" >
                <button type="button" onClick={(e) => close()} className="btn btn-primary sButton" >Close  </button>
                {/* <button type="button"  className="btn btn-primary sButton" >Create Pool</button> */}
            </div>
        </div>
    )
}