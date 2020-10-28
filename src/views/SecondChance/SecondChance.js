import React, { useCallback, useMemo, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Row, Container, Button, Input, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import BigNumber from 'bignumber.js'
import { getBalanceNumber, getDisplayBalance } from '../../utils/formatBalance';
import { formatAddress } from 'utils/formatAddress'
import { ChanceHeader } from './components/ChanceHeader'
import { ChanceStep } from './components/ChanceStep'
import { ChanceValueDisplay } from './components/ChanceValueDisplay'
import { ChanceDisplayRow } from './components/ChanceDisplayRow'
import { ChanceFooter } from './components/ChanceFooter'
import { ChanceButtonCard } from './components/ChanceButtonCard'
import { ChancePoolCard } from './components/ChancePoolCard'
import { Route, Switch } from 'react-router-dom'
import { ChancePoolInterface } from './ChancePool/ChancePoolInterface'
import { useTokenBalance } from '../../hooks/useTokenBalance'
import { useTotalSupply } from '../../hooks/useTotalSupply'
import { useAllowance } from '../../hooks/useAllowance'
import { useApprove } from '../../hooks/useApprove'
import { useSecondChance } from '../../hooks/useSecondChance'
import { FaucetButton } from './components/FaucetButton';

export const SecondChance = ({
  web3,
  accounts,
  contracts,
  network,
}) => {
  const { path } = useRouteMatch()
  const { ruggedCoins, second } = network
  const [waiting, setWaiting] = useState(false)
  const [selectedToken, setSelectedToken] = useState({
    id: -1,
    name: '',
    address: '',
    decimals: ''
  })

  const defiatBalance = useTokenBalance(web3, accounts[0], network.token)
  const ruggedBalance = useTokenBalance(web3, accounts[0], selectedToken.address)
  const ruggedSupply = useTotalSupply(web3, selectedToken.address)
  const ruggedAllowance = useAllowance(web3, accounts[0], selectedToken.address, second)
  const { onApprove } = useApprove(web3, accounts[0], selectedToken.address, second)
  const { onRecycle, swapRate } = useSecondChance(web3, accounts[0], selectedToken.address, second)
  
  const shareOfSupply = useMemo(() => {
    if (selectedToken.id !== -1) {
      return getDisplayBalance(ruggedBalance.times(100).div(ruggedSupply), 0)
    } else {
      return getDisplayBalance(new BigNumber(0))
    }
  }, [ruggedBalance, ruggedSupply])

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
  
  const handleTokenChange = (e) => {
    setSelectedToken(ruggedCoins[e.target.value])
  }

  const handleApprove = useCallback(async () => {
    setWaiting(true)
    await onApprove(`${selectedToken.name} recycling`)
    setWaiting(false)
  }, [onApprove, setWaiting, selectedToken])

  const handleRecycle = useCallback(async () => {
    setWaiting(true)
    await onRecycle()
    setWaiting(false)
  }, [onRecycle, setWaiting, ruggedBalance])

  return (
    <Container>
    <Switch>
      <Route exact path={path}>
        <Container>
          <ChanceHeader />
          <Row className="d-flex my-2">
            <FaucetButton
              web3={web3}
              accounts={accounts}
              tokenAddress={network.rugged}
              symbol={"R_UGGED"}
            />
            <FaucetButton
              web3={web3}
              accounts={accounts}
              tokenAddress={network.shitcoin}
              symbol={"SHIIIT"}
            />
            
          </Row>
          <Row className="d-flex w-100 h-100">
            <ChanceStep
              stepNumber="1."
              stepMessage="Select Coin to Recycle"
            >
              <Input 
                className="mb-3"
                type="select"
                name="secondChanceSelect"
                id="secondChanceSelect"
                value={selectedToken.id}
                onChange={(e) => handleTokenChange(e)}
              >
                <option value={-1} disabled>Select a rugged coin...</option>
                {ruggedCoins.map((ruggedCoin, i) => (
                  <option 
                    key={i}
                    value={ruggedCoin.id}
                  >
                    {ruggedCoin.name}
                  </option>
                ))}
              </Input>
              <Card className="d-flex flex-column h-100">
                <CardBody>
                  <img 
                    className="mb-2 img-fluid secondChanceCard" 
                    src={require('assets/img/recycle-solid-purple.png')}
                  />
                  <CardTitle className="text-primary card-title">
                    Recycle Rugged Tokens
                  </CardTitle>
                  <CardSubtitle className="text-tertiary card-subtitle">
                    Receive 2ND for helping save the DeFi Planet!
                  </CardSubtitle>
                  <ChanceDisplayRow
                    name="Token:"
                    value={selectedToken.name || '...'}
                    className="text-primary card-title"
                  />
                  <ChanceDisplayRow
                    name="Contract:"
                    className="text-tertiary card-subtitle"
                    value={selectedToken.id !== -1 ? (
                        <a href={`https://etherscan.io/token/${selectedToken.address}`}>
                          {formatAddress(selectedToken.address)}
                        </a>
                      ) : "..."
                    }
                  />
                  <ChanceDisplayRow
                    name="Decimals:"
                    value={selectedToken.decimals || '...'}
                  />

                  <ChanceValueDisplay
                    id="balance"
                    value={getDisplayBalance(ruggedBalance)}
                    title={selectedToken.name + " Balance"}
                    color="info"
                    tooltip={"The total amount of " + selectedToken.name + " in your connected ERC20 wallet."}
                  />
                  
                  <ChanceValueDisplay
                    id="supply"
                    value={getDisplayBalance(ruggedSupply)}
                    title={"Total " + selectedToken.name + " Supply"}
                    color="info"
                    tooltip={"The total amount of " + selectedToken.name + " in existence."}
                  />
                </CardBody>
              </Card>
            </ChanceStep>

            <ChanceStep
              stepNumber="2."
              stepMessage="Add your Coins and get 2ND"
            >
              <Card className="d-flex flex-column h-100">
                <CardBody className="secondChanceAddMargin">
                  <img 
                    className="mb-3 img-fluid secondChanceCard" 
                    src={require('assets/img/2nd-logo.png')}
                  />
                  <CardTitle className="text-primary card-title">
                    2ND Chance Token
                  </CardTitle>
                  <CardSubtitle className="text-tertiary card-subtitle">
                    Deflationary farming token powered by DeFiat.
                  </CardSubtitle>
                  
                  <ChanceValueDisplay
                    id="percentage"
                    value={shareOfSupply + "%"}
                    title={"Percentage of " + selectedToken.name + " you own"}
                    color="info"
                    tooltip={"Percentage of " + selectedToken.name + " you own"}
                  />
                  <ChanceValueDisplay
                    id="multiplier"
                    value={getBoostDisplay + "%"}
                    title="2ND-DFT Boost Multiplier"
                    color="info"
                    tooltip="Earn extra 2ND for holding DFT. Each DFT you own adds 1% boost, up to 200% extra"
                  />
                  <ChanceValueDisplay
                    id="received"
                    value={getDisplayBalance(swapRate)}
                    title={"Amount of 2ND TOKENS you will receive"}
                    color="info"
                    tooltip={"% of " + selectedToken.name + " you own * Boost * 1000 = 2ND RECEIVED"}
                  />
                  {ruggedAllowance.eq(0) ? (
                    <Button
                      color="primary"
                      className="secondChanceUniButtons"
                      disabled={ruggedBalance.eq(0) || waiting}
                      onClick={handleApprove}
                    >
                      Approve Recycle
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      className="secondChanceUniButtons"
                      disabled={ruggedBalance.eq(0)  || waiting}
                      onClick={handleRecycle}
                    >
                      Recycle
                    </Button>
                  )}
                </CardBody>
              </Card>
            </ChanceStep>
            <ChanceStep
              stepNumber="3."
              stepMessage="Farm your 2ND!"
            >
              <ChancePoolCard 
                web3={web3}
                accounts={accounts}
                network={network}
              />
              <hr className="line-primary secondChanceLine" />
              <ChanceButtonCard secondAddress={second} />
            </ChanceStep>
          </Row>
          <ChanceFooter />
        </Container>
      </Route>
      <Route path={`${path}/:contractId`}>
        <ChancePoolInterface
          web3={web3}
          accounts={accounts}
          network={network}
        />
      </Route>
    </Switch>
    </Container>
  )
}
