import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getAllowance, getTokenContract } from '../utils/erc20'
import { useBlock } from './useBlock'

export const useAllowance = (web3, account, tokenAddress, spenderAddress) => {
  const block = useBlock(web3)
  const [allowance, setAllowance] = useState(new BigNumber(0))

  const tokenContract = useMemo(() => {
    return getTokenContract(web3, tokenAddress)
  }, [web3, tokenAddress])

  const fetchAllowance = useCallback(async () => {
    const newAllowance = await getAllowance(tokenContract, account, spenderAddress)
    if (!allowance.eq(newAllowance)) {
      setAllowance(newAllowance)
    }
  }, [account, tokenContract, spenderAddress, setAllowance])

  useEffect(() => {
    if (web3 && account) {
      fetchAllowance()
    }
  }, [account, block, web3, fetchAllowance])

  return allowance
}
