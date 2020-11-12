import React, { useMemo } from 'react'
import { ChanceRuggedCard } from './components/ChanceRuggedCard'
import BigNumber from 'bignumber.js'
import { ThemeProvider, Grid, Typography } from '@material-ui/core'
import theme from '../../../theme'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { getBalanceNumber, getDisplayBalance } from 'utils'

export const ChanceDashboard = ({
  web3,
  accounts,
  network
}) => {
  const { ruggedCoins, token } = network
  const defiatBalance = useTokenBalance(web3, accounts[0], token)
  const getBoostDisplay = useMemo(() => {
    const number = new BigNumber(getBalanceNumber(defiatBalance))
    if (number.eq(0)) {
      return "100.00"
    } else if (number.gt(200)) {
      return "300.00"
    } else {
      return getDisplayBalance(number.plus(100), 0)
    }
  }, [defiatBalance])


  return (
    <ThemeProvider theme={theme}>
      <Typography><b>DFT Boost: {getBoostDisplay}%</b></Typography>
      <Grid container spacing={3}>
        {ruggedCoins.map((ruggedCoin, i) => (
          <ChanceRuggedCard
            key={i}
            web3={web3}
            account={accounts[0]}
            network={network}
            ruggedCoin={ruggedCoin}
          />
        ))}
      </Grid>
    </ThemeProvider>
  )
}
