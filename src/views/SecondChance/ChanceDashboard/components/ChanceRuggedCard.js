import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Grid, Paper, Typography, Button, Box } from '@material-ui/core'
import { useAllowance } from 'hooks/useAllowance'
import { useTotalSupply } from 'hooks/useTotalSupply'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { useSecondChance } from 'hooks/useSecondChance'
import { useApprove } from 'hooks/useApprove'
import { getDisplayBalance, formatAddress } from 'utils'
import { ChanceCardRow } from './ChanceCardRow'

export const ChanceRuggedCard = ({
  web3,
  account,
  network,
  ruggedCoin
}) => {
  const { second } = network
  const [waiting, setWaiting] = useState(false)
  const ruggedBalance = useTokenBalance(web3, account, ruggedCoin.address)
  const ruggedSupply = useTotalSupply(web3, ruggedCoin.address)
  const ruggedAllowance = useAllowance(web3, account, ruggedCoin.address, second)
  const { onApprove } = useApprove(web3, account, ruggedCoin.address, second)
  const { onRecycle, swapRate } = useSecondChance(web3, account, ruggedCoin.address, second)

  const shareOfSupply = useMemo(() => {
    if (ruggedCoin.address !== -1) {
      return getDisplayBalance(ruggedBalance.times(100).div(ruggedSupply), 0)
    } else {
      return getDisplayBalance(new BigNumber(0))
    }
  }, [ruggedBalance, ruggedSupply])

  const handleApprove = useCallback(async () => {
    setWaiting(true)
    await onApprove(`${ruggedCoin.name} recycling`)
    setWaiting(false)
  }, [onApprove, setWaiting])

  const handleRecycle = useCallback(async () => {
    setWaiting(true)
    await onRecycle()
    setWaiting(false)
  }, [onRecycle, setWaiting, ruggedBalance])

  return (
    <Grid item xs={12} sm={6}>
      <Paper>
        <Box p={2}>
        <ChanceCardRow
          title={"Name:"}
          value={<b>{ruggedCoin.name}</b>}
        />
        <ChanceCardRow
          title={"Symbol:"}
          value={ruggedCoin.symbol}
        />
        <ChanceCardRow
          title={"Contract:"}
          value={
            <a 
              href={`https://etherscan.io/token/${ruggedCoin.address}`}
              target="_blank"
              rel="noopenner referrer"  
            >
              {formatAddress(ruggedCoin.address)}
            </a>
          }
        />
        <ChanceCardRow
          title={"Total Supply:"}
          value={getDisplayBalance(ruggedSupply, ruggedCoin.decimals)}
        />
        <ChanceCardRow
          title={"My Balance:"}
          value={getDisplayBalance(ruggedBalance, ruggedCoin.decimals)}
        />
         {ruggedAllowance.eq(0) ? (
            <Button
              variant="contained"
              color="primary"
              // className="secondChanceUniButtons"
              disabled={ruggedBalance.eq(0) || waiting}
              onClick={handleApprove}
              fullWidth
            >
              Approve Recycle
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              // className="secondChanceUniButtons"
              disabled={ruggedBalance.eq(0) || swapRate.eq(0) || waiting}
              onClick={handleRecycle}
              fullWidth
            >
              Recycle for {getDisplayBalance(swapRate)} 2ND
            </Button>
          )}
          </Box>
      </Paper>
    </Grid>
  )
}
