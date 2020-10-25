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
        {txn && (
          <p>
            <a 
              className="text-info" 
              href={`https://etherscan.io/tx/${txn}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Etherscan 🔎
            </a>
          </p>
        )}
      </>
    </>
  )
}
