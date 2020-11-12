import { useCallback, useEffect, useMemo, useState } from 'react'
import { useBlock } from './useBlock'
import DeFiat_Farming from 'contracts/DeFiat_Farming_v15.json'
import DeFiat_FarmingExt from 'contracts/DeFiat_EXTFarming_V2.json'
import { getPoolMetrics } from '../DeFiat/utils'
import BigNumber from 'bignumber.js'

export const useBondedPoolMetrics = (
  web3, 
  poolAddress, 
  isExtended
) => {
  const block = useBlock(web3)
  const [poolMetrics, setPoolMetrics] = useState({
    startTime: 0,
    closingTime: 0,
    staked: 0,
    stakingFee: 0
  })

  const poolContract = useMemo(() => {
    if (isExtended) {
      return new web3.eth.Contract(DeFiat_FarmingExt.abi, poolAddress)
    } else {
      return new web3.eth.Contract(DeFiat_Farming.abi, poolAddress)
    }
  }, [web3, poolAddress, isExtended])

  const fetchMetrics = useCallback(async () => {
    const newMetrics = await getPoolMetrics(poolContract)
    if (newMetrics) {
      setPoolMetrics(newMetrics)
    }
  }, [poolContract, setPoolMetrics])

  useEffect(() => {
    if (web3) {
      fetchMetrics()
    }
  }, [block, web3])

  return {
    poolMetrics,
    isPoolOpen: new Date().getTime() > Number(poolMetrics.startTime) * 1000,
    isPoolClosed: new Date().getTime() > Number(poolMetrics.closingTime) * 1000,
    totalStaked: new BigNumber(poolMetrics.staked),
    poolOpen: new Date(Number(poolMetrics.startTime) * 1000).toLocaleDateString(),
    poolClose: new Date(Number(poolMetrics.closingTime) * 1000).toLocaleDateString(),
    poolFee: Number(poolMetrics.stakingFee) / 10
  }
}
