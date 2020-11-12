import React from 'react'
import { Button } from 'reactstrap'
import { useFaucet } from 'hooks/useFaucet'

export const FaucetButton = ({
  web3,
  accounts,
  tokenAddress,
  symbol
}) => {
  const { onFaucet } = useFaucet(web3, accounts[0], tokenAddress)

  return (
    <Button
      color="primary"
      onClick={onFaucet}
    >
      Get {symbol}
    </Button>
  )
}
