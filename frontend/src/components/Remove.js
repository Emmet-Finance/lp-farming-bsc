import React from 'react'

export const Remove = ({remove}) => {
    
    return(
        <div className="display-board">

            <h4>Remove Tokens From Pool</h4>
            <div className="btn" >
                <button type="button" onClick={(e) => remove()} className="btn btn-primary sButton" >Remove </button>
                {/* <button type="button"  className="btn btn-primary sButton" >Create Pool</button> */}
            </div>
        </div>
    )
}