import React, { useCallback, useEffect, useState } from 'react'
import { useBlock } from './useBlock'
import { toast } from 'react-toastify'
import { TooltipMessage } from 'components/TooltipMessage'

// store this as local state until we have TransactionProvider

export const useAntiSpam = (web3) => {
  const block = useBlock(web3)
  const [lastTransaction, setLastTransaction] = useState(-1)

  const handleTransaction = useCallback((txHash) => {
    setLastTransaction(block.number)
  }, [setLastTransaction, block])

  const checkAntiSpam = () => {
    if (block.number === lastTransaction) {
      toast.warn(
        <TooltipMessage
          title="🤖 AntiSpam Alert!"
          message="You just interacted with this pool! Wait 1 block to perform this action and try again." 
        />
      )
      return true
    }
    return false
  }

  return {
    onTransaction: handleTransaction,
    checkAntiSpam
  }
}
