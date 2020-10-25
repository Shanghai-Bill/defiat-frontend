import React, { useCallback, useMemo } from 'react'
import Perpetual_Farm from 'contracts/secondchance/Rug_Sanctuary.json'
import { withdraw } from '../DeFiat/utils'
import { toast } from 'react-toastify'
import { TooltipMessage } from 'components/TooltipMessage'

export const usePerpetualWithdraw = (web3, account, poolAddress) => {
  const farmContract = useMemo(() => {
    return new web3.eth.Contract(Perpetual_Farm.abi, poolAddress)
  }, [web3, poolAddress])

  const handleWithdraw = useCallback(async (amount) => {
    const txHash = await withdraw(farmContract, account, amount)
    if (!txHash) {
      toast.error(
        <TooltipMessage 
          title="⛔️ Error" 
          message="Encountered an error, could not withdraw/claim." 
        />
      )
    } else {
      if (amount.eq(0)) {
        toast.success(
          <TooltipMessage 
            title="✅ Success" 
            message={`Successfully claimed rewards.`} 
            txn={txHash} 
          />
        )
      } else {
        toast.success(
          <TooltipMessage 
            title="✅ Success" 
            message={`Successfully withdrew tokens and claimed rewards.`} 
            txn={txHash} 
          />
        )
      }
      
    }
    return txHash
  }, [account, farmContract])

  return {
    onWithdraw: handleWithdraw
  }
}