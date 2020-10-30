import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getTokenContract } from '../utils/erc20'
import { toast } from 'react-toastify'
import { TooltipMessage } from 'components/TooltipMessage'
import { swapFor2ndChance, getEthFee, get2ndChanceSwapRate } from 'DeFiat/utils'
import Second_Chance from 'contracts/secondchance/Second_Chance.json'
import BigNumber from 'bignumber.js'
import { useTokenBalance } from './useTokenBalance'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const useSecondChance = (web3, account, ruggedAddress, secondAddress) => {
  const [ethFee, setEthFee] = useState(new BigNumber(0))
  const [swapRate, setSwapRate] = useState(new BigNumber(0))

  const ruggedBalance = useTokenBalance(web3, account, ruggedAddress)

  const secondChanceContract = useMemo(() => {
    return new web3.eth.Contract(Second_Chance.abi, secondAddress)
  }, [web3, secondAddress])

  const handleRecycle = useCallback(async () => {
    const txHash = await swapFor2ndChance(secondChanceContract, ruggedAddress, account, ruggedBalance, ethFee)
    if (!txHash) {
      toast.error(
        <TooltipMessage 
          title="⛔️ Error" 
          message="Encountered an error, could not recycle shitcoins." 
        />
      )
    } else {
      toast.success(
        <TooltipMessage 
          title="✅ Success" 
          message={`Successfully recycled shitcoins for 2ND Chance!`} 
          txn={txHash} 
        />
      )
    }
  }, [secondChanceContract, ruggedAddress, account, ethFee, ruggedBalance])

  const fetchSwapRate = useCallback(async () => {
      const newRate = await get2ndChanceSwapRate(secondChanceContract, account, ruggedAddress, ruggedBalance)
      setSwapRate(newRate)
  }, [secondChanceContract, setSwapRate, account, ruggedAddress, ruggedBalance])

  const fetchEthFee = useCallback(async () => {
    const fee = await getEthFee(secondChanceContract)
    setEthFee(fee)
  }, [secondChanceContract, setEthFee])

  useEffect(() => {
    if (web3) {
      fetchSwapRate(ruggedBalance)
    }
  }, [web3, ruggedBalance])

  useEffect(() => {
    if (web3) {
      fetchEthFee()
    }
  }, [web3, fetchEthFee])

  return {
    onRecycle: handleRecycle,
    swapRate
  }
}
