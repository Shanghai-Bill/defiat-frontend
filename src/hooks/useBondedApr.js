import { useCallback, useEffect, useMemo, useState } from 'react'
import { useBlock } from './useBlock'
import { usePriceOracle } from './usePriceOracle'
import BigNumber from 'bignumber.js'
import { useBondedPoolMetrics } from './useBondedPoolMetrics'

BigNumber.config({
  DECIMAL_PLACES: 80
})

export const useBondedApr = (web3, oracleAddress, poolAddress, stakedAddress, rewardAddress) => {
  const [apr, setApr] = useState(new BigNumber(0))
  const { poolMetrics } = useBondedPoolMetrics(web3, poolAddress)

  const stakedPrice = usePriceOracle(web3, oracleAddress, stakedAddress)
  const rewardPrice = usePriceOracle(web3, oracleAddress, rewardAddress)

  const fetchApr = useCallback(() => {
    //console.log(poolMetrics)
    const stakedInEth = new BigNumber(poolMetrics.staked).times(stakedPrice)
    // console.log(stakedInEth.toString())
    
    const rewardsInEth = new BigNumber(poolMetrics.rewards).times(rewardPrice)
    
    const timeRemainingInHours = ((Number(poolMetrics.closingTime) * 1000) - new Date().getTime()) / 3600000;
    console.log(timeRemainingInHours)
    const rewardsPerHour = rewardsInEth.times(1e18).div(timeRemainingInHours).div(1e18)
    
    // rewards distributed per hour per 1 staked token
    const rewardsPerHourPerToken = rewardsPerHour.times(1e18).div(stakedInEth).div(1e18)
    // annual simple rate 
    const tokensPerYear = rewardsPerHourPerToken.times(24).times(365)
    // convert to percentage
    const rate = tokensPerYear.times(100)

    // if (poolAddress === '0x7BACeF5001203724B1D8b5480dfb7238fcA1375c') {
    //   console.log(poolMetrics)
    //   console.log(stakedInEth.div(1e18).toString(), rewardsInEth.div(1e18).toString())
    // }

    //console.log(poolMetrics, rewardsPerHourPerToken * (rewardsInEth / 2160), rate)
    console.log(rate.toString())
    setApr(rate)
  }, [stakedPrice, rewardPrice, poolMetrics, setApr, rewardAddress, stakedAddress])

  useEffect(() => {
    if (web3 && poolMetrics) {
      fetchApr()
    }
  }, [poolMetrics, web3, fetchApr])

  return apr
}
