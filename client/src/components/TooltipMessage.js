import React from 'react'

export const TooltipMessage = ({
  title,
  message,
  txn
}) => {
  return (
    <>
      <>
        <h3 className="mb-1">{title}</h3>
        <p>{message}</p>
        {txn && (<p><a href={`https://etherscan.io/tx/${txn}`}>View on Etherscan 🔎</a></p>)}
      </>
    </>
  )
}
