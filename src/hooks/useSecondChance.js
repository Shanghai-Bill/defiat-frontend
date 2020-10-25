import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getTokenContract } from '../utils/erc20'
import { toast } from 'react-toastify'
import { TooltipMessage } from 'components/TooltipMessage'
import { swapFor2ndChance, getEthFee, get2ndChanceSwapRate } from 'DeFiat/utils'
import Second_Chance from 'contracts/secondchance/Second_Chance.json'
import BigNumber from 'bignumber.js'

export const useSecondChance = (web3, account, ruggedAddress, secondAddress) => {
  const [ethFee, setEthFee] = useState(new BigNumber(0))
  const [swapRate, setSwapRate] = useState(new BigNumber(0))

  const rugContract = useMemo(() => {
    return getTokenContract(web3, ruggedAddress)
  }, [web3, ruggedAddress])

  const secondChanceContract = useMemo(() => {
    return new web3.eth.Contract(Second_Chance.abi, secondAddress)
  }, [web3, secondAddress])

  const handleRecycle = useCallback(async (amount) => {
    console.log(amount, ethFee, account)
    const txHash = await swapFor2ndChance(secondChanceContract, ruggedAddress, account, amount, ethFee)
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
  }, [secondChanceContract, rugContract, account, ethFee])

  const fetchSwapRate = useCallback(async () => {
    const newRate = await get2ndChanceSwapRate(secondChanceContract, ruggedAddress, new BigNumber(1))
    setSwapRate(newRate)
  }, [secondChanceContract, ruggedAddress, setSwapRate])

  const fetchEthFee = useCallback(async () => {
    const fee = await getEthFee(secondChanceContract)
    setEthFee(fee)
  }, [secondChanceContract, setEthFee])

  useEffect(() => {
    if (web3) {
      fetchSwapRate()
    }
  }, [web3, fetchSwapRate])

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
