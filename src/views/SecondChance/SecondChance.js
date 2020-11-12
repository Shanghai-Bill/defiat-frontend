import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Row, Container, Button, ButtonGroup } from 'reactstrap'
import { FlexCenter } from '../../components/FlexCenter'
import { Route, Switch } from 'react-router-dom'
import { ChancePool } from './ChancePool'
import { ChanceInfo } from './ChanceInfo'
import { ChanceDashboard } from './ChanceDashboard'
import { Typography } from '@material-ui/core'

export const SecondChance = ({
  web3,
  accounts,
  contracts,
  network,
}) => {
  const { path } = useRouteMatch()
  const history = useHistory()

  return (
    <Container>
      <FlexCenter>
        <img
          src={require('assets/img/2nd-brand-full.png')}
          alt="2nd-brand"
          width="100%"
          height="auto"
        />
      </FlexCenter>
      <Typography>
        <b>2ND:</b> <a href={`https://etherscan.io/address/${network.second}`} target="_blank" rel="referrer noopenner">Contract</a> <a href={`https://app.uniswap.org/#/swap?inputCurrency=${network.second}`} target="_blank" rel="referrer noopenner">Uniswap</a> <a href={`https://uniswap.info/token/${network.second}`} target="_blank" rel="referrer noopenner">Info</a>
      </Typography>
      <ButtonGroup className="mb-2">
        <Button color="primary" onClick={() => history.push(`${path}/about`)}>About</Button>
        <Button color="primary" onClick={() => history.push(`${path}/`)}>Dashboard</Button>
        <Button color="primary" onClick={() => history.push(`${path}/${network.secondPool.poolAddress}`)}>Pool</Button>
      </ButtonGroup>
      <Switch>
        <Route exact path={path}>
          <ChanceDashboard
            web3={web3}
            accounts={accounts}
            network={network}
          />
        </Route>
        <Route path={`${path}/about`}>
          <ChanceInfo
            web3={web3}
            accounts={accounts}
            network={network}
          />
        </Route>
        <Route path={`${path}/:contractId`}>
          <ChancePool
            web3={web3}
            accounts={accounts}
            network={network}
          />
        </Route>
      </Switch>
    </Container>
  )
}
