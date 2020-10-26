import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useBlock } from './useBlock'
import Perpetual_Farm from 'contracts/secondchance/Rug_Sanctuary.json'
import { staked } from '../DeFiat/utils'

export const usePerpetualStakedBalance = (web3, account, poolAddress) => {
  const block = useBlock(web3)
  const [balance, setBalance] = useState(new BigNumber(0))

  const farmContract = useMemo(() => {
    return new web3.eth.Contract(Perpetual_Farm.abi, poolAddress)
  }, [web3, poolAddress])

  const fetchBalance = useCallback(async () => {
    const newBalance = await staked(farmContract, account)
    if (!balance.eq(newBalance)) {
      setBalance(newBalance)
    }
  }, [account, farmContract, setBalance, balance])

  useEffect(() => {
    if (web3 && account) {
      fetchBalance()
    }
  }, [block, web3, account, fetchBalance])


  return balance
}
