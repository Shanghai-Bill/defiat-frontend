import React, { useMemo, useState } from 'react'
import { ChanceRuggedCard } from './components/ChanceRuggedCard'
import BigNumber from 'bignumber.js'
import { ThemeProvider, Grid, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from '@material-ui/core'
import theme from '../../../theme'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { getBalanceNumber, getDisplayBalance } from 'utils'
import { FaSearch } from 'react-icons/fa'
import { MdSearch } from 'react-icons/md'
// import { Button } from 'reactstrap'

export const ChanceDashboard = ({
  web3,
  accounts,
  network
}) => {
  const { ruggedCoins, token } = network

  const [filtered, setFiltered] = useState(false)
  const [query, setQuery] = useState('')
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

  const filterCoin = (ruggedCoin) => {
    if (query === ''
      || ruggedCoin.name.toLowerCase().includes(query.toLowerCase()) 
      || ruggedCoin.symbol.toLowerCase().includes(query.toLowerCase())
      || ruggedCoin.address.toLowerCase().includes(query.toLowerCase())
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <Box mb={2}> */}
        <Typography><b>DFT Boost: {getBoostDisplay}%</b></Typography>
      {/* </Box> */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="outlined-adornment-amount">Search Rugged Tokens</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              startAdornment={<InputAdornment position="start"><MdSearch /></InputAdornment>}
              // endAdornment={<InputAdornment position="end"><Button color="primary">Filter Owned Tokens</Button></InputAdornment>}
              labelWidth={200}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button color="primary" onClick={() => setFiltered(!filtered)}>
            {filtered ? "Show All" : "Show Owned"}
          </Button>
        </Grid>
      </Grid>
      
      
      <Grid container spacing={3}>
        {ruggedCoins.filter((ruggedCoin) => filterCoin(ruggedCoin)).map((ruggedCoin, i) => (
          <ChanceRuggedCard
            key={i}
            web3={web3}
            account={accounts[0]}
            network={network}
            ruggedCoin={ruggedCoin}
            shouldFilter={filtered}
          />
        ))}
      </Grid>
    </ThemeProvider>
  )
}
