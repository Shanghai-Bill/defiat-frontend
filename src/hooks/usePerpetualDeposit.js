import React, { useCallback, useMemo } from 'react'
import Perpetual_Farm from 'contracts/secondchance/Rug_Sanctuary.json'
import { deposit } from '../DeFiat/utils'
import { toast } from 'react-toastify'
import { TooltipMessage } from 'components/TooltipMessage'

export const usePerpetualDeposit = (web3, account, poolAddress) => {
  const farmContract = useMemo(() => {
    return new web3.eth.Contract(Perpetual_Farm.abi, poolAddress)
  }, [web3, poolAddress])

  const handleDeposit = useCallback(async (amount) => {
    const txHash = await deposit(farmContract, account, amount)
    if (!txHash) {
      toast.error(
        <TooltipMessage 
          title="⛔️ Error" 
          message="Encountered an error, could not deposit/claim." 
        />
      )
    } else {
      toast.success(
        <TooltipMessage 
          title="✅ Success" 
          message={`Successfully deposited tokens and claimed any available rewards.`} 
          txn={txHash} 
        />
      )
    }
    return txHash
  }, [account, farmContract])

  return {
    onDeposit: handleDeposit
  }
}
