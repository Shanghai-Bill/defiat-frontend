import { useCallback, useEffect, useMemo, useState } from 'react'
import { useBlock } from './useBlock'
import { getTokenContract, getTotalSupply } from '../utils/erc20'
import BigNumber from 'bignumber.js'

export const useTotalSupply = (web3, tokenAddress) => {
  const block = useBlock(web3)
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0))

  const tokenContract = useMemo(() => {
    return getTokenContract(web3, tokenAddress)
  }, [web3, tokenAddress])

  const fetchTotalSupply = useCallback(async () => {
    const newSupply = await getTotalSupply(tokenContract)
    if (!totalSupply.eq(newSupply)) {
      setTotalSupply(newSupply)
    }
  }, [tokenContract, setTotalSupply, totalSupply])

  useEffect(() => {
    if (web3 && tokenAddress) {
      fetchTotalSupply()
    }
  }, [block, web3, tokenAddress, fetchTotalSupply])  

  return totalSupply
}
