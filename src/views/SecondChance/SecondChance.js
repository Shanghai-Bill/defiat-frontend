import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Row, Container, Button, ButtonGroup } from 'reactstrap'
import { FlexCenter } from '../../components/FlexCenter'
import { Route, Switch } from 'react-router-dom'
import { ChancePoolInterface } from './ChancePool/ChancePoolInterface'
import { useTokenBalance } from '../../hooks/useTokenBalance'
import { useTotalSupply } from '../../hooks/useTotalSupply'
import { useAllowance } from '../../hooks/useAllowance'
import { useApprove } from '../../hooks/useApprove'
import { useSecondChance } from '../../hooks/useSecondChance'
import { FaucetButton } from './components/FaucetButton';
import Select from 'react-select';
import { red } from '@material-ui/core/colors';

export const SecondChance = ({
  web3,
  accounts,
  contracts,
  network,
}) => {
  const { path } = useRouteMatch()
  const { ruggedCoins, second, token } = network
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
    setSelectedToken(ruggedCoins[e.value])
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




    const test = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

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
            <Container className="d-overflowH">
            <Row className="d-flex w-100 h-100">
              <ChanceStep
                stepNumber="1."
                stepMessage="Select Coin to Recycle"
              >
                <Select
                                      className="mb-3"
                                      classNamePrefix="defiatSelect"
                                      type="select"
                                      name="secondChanceSelect"
                                      id="secondChanceSelect"
                                      placeholder="Select a rugged coin..."
                                      onChange={(e) => handleTokenChange(e)}
                                      defaultValue={-1}
                                      styles={{
                                          control: (base) => ({ ...base, color: 'white' }),
                                      }}
                                      options={
                                          ruggedCoins.map((ruggedCoin, i) => ({
                                              key: i,
                                              value: ruggedCoin.id,
                                              name: ruggedCoin.name
                                          }))
                                      }
                                      getOptionLabel={(option) => option.name}
                                      getOptionValue={(option) => option.value}
                >
                </Select>
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
                  <CardBody>
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
                      tooltip={"Percentage of " + selectedToken.name + " you own. If you own more than 2% of the supply, you must make multiple swaps to prevent token abuse."}
                    />
                    <ChanceValueDisplay
                      id="multiplier"
                      value={getBoostDisplay + "%"}
                      title="2ND-DFT Boost Multiplier"
                      color="info"
                      tooltip="Earn extra 2ND for holding DFT. Each DFT you own adds 1% boost, up to a total 300% multiplier"
                    />
                    <ChanceValueDisplay
                      id="received"
                      value={getDisplayBalance(swapRate)}
                      title={"Amount of 2ND TOKENS you will receive"}
                      color="info"
                      tooltip={"% of " + selectedToken.name + " you own * 1000 * (Boost/100) = 2ND RECEIVED"}
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
                <ChanceButtonCard 
                  defiatAddress={token}
                  secondAddress={second} 
                />
              </ChanceStep>
            </Row>
            </Container>
            <ChanceFooter />
          </Container>
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
