import React, { useCallback, useMemo } from 'react'
import { getTokenContract, approve } from 'utils/erc20'
import { toast } from 'react-toastify'
import { TooltipMessage } from 'components/TooltipMessage'

export const useApprove = (web3, account, tokenAddress, spenderAddress) => {

  const tokenContract = useMemo(() => {
    return getTokenContract(web3, tokenAddress)
  }, [web3, tokenAddress])

  const handleApprove = useCallback(async (message) => {
    const txHash = await approve(tokenContract, spenderAddress, account)
    if (!txHash) {
      toast.error(
        <TooltipMessage 
          title="⛔️ Error" 
          message={`Encountered an error, could not approve ${message}.`} 
        />
      )
    } else {
      toast.success(
        <TooltipMessage 
          title='✅ Success' 
          message={`Successfully approved ${message}.`} 
          txn={txHash} 
        />
      )
    }
  }, [tokenContract, account, spenderAddress])

  return {
    onApprove: handleApprove,
  }
}
