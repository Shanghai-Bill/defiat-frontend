import { useCallback, useEffect, useMemo, useState } from 'react'
import Uni_Price_v2 from 'contracts/Uni_Price_v2.json'
import { useBlock } from 'hooks/useBlock'
import { getUniPrice } from '../DeFiat/utils'
import BigNumber from 'bignumber.js'

export const usePriceOracle = (web3, oracleAddress, tokenAddress) => {
  const block = useBlock(web3)
  const [price, setPrice] = useState(new BigNumber(0))

  const priceOracle = useMemo(() => {
    return new web3.eth.Contract(Uni_Price_v2.abi, oracleAddress)
  }, [web3, oracleAddress])

  const fetchPrice = useCallback(async () => {
    const uniPrice = await getUniPrice(priceOracle, tokenAddress)
    setPrice(uniPrice)
  }, [priceOracle, tokenAddress, setPrice])

  useEffect(() => {
    if (web3) {
      fetchPrice()
    }
  }, [web3, block, fetchPrice])

  return price
}
