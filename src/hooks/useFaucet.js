import React, { useCallback, useMemo } from 'react'
import { faucet } from 'DeFiat/utils'
import IShitcoin from 'contracts/secondchance/IShitcoin.json'
import { toast } from 'react-toastify'
import { TooltipMessage } from 'components/TooltipMessage'

export const useFaucet = (web3, account, tokenAddress) => {

  const tokenContract = useMemo(() => {
    return new web3.eth.Contract(IShitcoin.abi, tokenAddress)
  }, [web3, tokenAddress])

  const handleFaucet = useCallback(async (message) => {
    const txHash = await faucet(tokenContract, account)
    if (!txHash) {
      toast.error(
        <TooltipMessage 
          title="⛔️ Error" 
          message={`Encountered an error, could not get shitcoins.`} 
        />
      )
    } else {
      toast.success(
        <TooltipMessage 
          title='✅ Success' 
          message={`Successfully received some shitcoins.`} 
          txn={txHash} 
        />
      )
    }
  }, [tokenContract, account, tokenAddress])

  return {
    onFaucet: handleFaucet,
  }
}
