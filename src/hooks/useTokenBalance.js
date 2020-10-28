import { useCallback, useEffect, useMemo, useState } from 'react'
import { useBlock } from './useBlock'
import { getTokenBalance, getTokenContract } from '../utils/erc20'
import BigNumber from 'bignumber.js'

export const useTokenBalance = (web3, account, tokenAddress) => {
  const block = useBlock(web3)
  const [balance, setBalance] = useState(new BigNumber(0))

  const tokenContract = useMemo(() => {
      return getTokenContract(web3, tokenAddress)
  }, [web3, tokenAddress])

  const updateTokenBalance = useCallback(async () => {
    const newBalance = await getTokenBalance(tokenContract, account)
    if (!balance.eq(newBalance)) {
      setBalance(newBalance)
    }
  }, [account, tokenContract, balance, setBalance])

  useEffect(() => {
    if (web3 && account) {
      updateTokenBalance()
    }
  }, [block, web3, account, updateTokenBalance])  

  return balance
}
