import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getTokenContract } from '../utils/erc20'
import { toast } from 'react-toastify'
import { TooltipMessage } from 'components/TooltipMessage'
import { swapFor2ndChance, getEthFee, get2ndChanceSwapRate } from 'DeFiat/utils'
import Second_Chance from 'contracts/secondchance/Second_Chance.json'
import BigNumber from 'bignumber.js'
import { useTokenBalance } from './useTokenBalance'

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
    console.log('swap')
    if (!ruggedBalance.eq(0)) {
      const newRate = await get2ndChanceSwapRate(secondChanceContract, ruggedAddress, ruggedBalance)
      console.log(newRate.toString(), ruggedBalance.toString())
      setSwapRate(newRate)
    } else {
      setSwapRate(new BigNumber(0))
    }
  }, [secondChanceContract, ruggedAddress, setSwapRate, ruggedBalance])

  const fetchEthFee = useCallback(async () => {
    const fee = await getEthFee(secondChanceContract)
    setEthFee(fee)
  }, [secondChanceContract, setEthFee])

  useEffect(() => {
    if (web3) {
      fetchSwapRate()
    }
  }, [web3, fetchSwapRate, ruggedAddress, ruggedBalance])

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
