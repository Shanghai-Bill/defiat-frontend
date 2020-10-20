import React, { useEffect, useState } from 'react'
import { Row,Col,Container,Button,Input,Card,CardBody,CardTitle,CardSubtitle,CardText,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import { PoolCard } from '../Staking/PoolCard';
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { PoolInterface } from '../Staking/PoolInterface';
import DeFiat_FarmingExt from 'contracts/DeFiat_EXTFarming_V2.json'
import { Operator } from '../Operator'
import recycle from 'assets/img/recycle-solid-purple.png'
import { DashboardCard } from '../Dashboard/components/DashboardCard'
import DeFiat_Token from 'contracts/DeFiat_Token.json'
import ERC20Token from 'contracts/_ERC20.json'
import { Wallet } from '../Dashboard/components/Wallet';

export const SecondChance = ({
  web3,
  accounts,
  contracts,
  network,
}) => {


  const [selectedToken, setSelectedToken] = useState(0);

  const handleTokenChange = (v) => {
    setSelectedToken(v.target.value);
    setWalletState({
      balance: 0,
      totalSupply: 0,
      shareOfSupply: 0,
      secondToReceive: 0
    });
    setCanRecycle(false);
    //getWalletData();
  }

  // create button on click that reads wallet for current selected coin and populates dom
  const contractAbi = ERC20Token.abi;
  const [isOpen, setOpen] = useState(false);
  const [recycleAmountInput, setRecycleAmountInput] = useState('');
  const { path } = useRouteMatch();
  const [isLoading, setLoading] = useState(true);
  const [canRecycle, setCanRecycle] = useState(false);
  const [blockNumber, setBlockNumber] = useState(0);
  const [poolMetrics, setPoolMetrics] = useState([]);
  const [walletState, setWalletState] = useState({
    balance: 0,
    totalSupply: 0,
    shareOfSupply: 0,
    secondToReceive: 0
  })


  const ruggedCoins = [
    { id: 0, token: 'SHROOM', contract: '0xed0439eacf4c4965ae4613d77a5c2efe10e5f183', decimals: '18' },
    { id: 1, token: 'DFT', contract: '0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1', decimals: '18' },
    { id: 2, token: 'DRC', contract: '0xb78B3320493a4EFaa1028130C5Ba26f0B6085Ef8', decimals: '18' },
  ]

  const handleToggle = () => {
    if (isOpen) {
      setRecycleAmountInput('')
    }
    setOpen(!isOpen);
  }

  const checkBalance = () => {
    getWalletData();
    setCanRecycle(true);

  }

  const handleRecycle = () => {
    //setStakeAction('Stake');
    setOpen(true);
  }

  const handleMax = () => {
    setRecycleAmountInput(walletState.balance)
  }

  useEffect(() => {
    loadPoolData();
    //getWalletData();
    const subscription = web3.eth.subscribe('newBlockHeaders', (error, result) => {
      if (!error) {
        setBlockNumber(result.number);
        loadPoolData();
        //getWalletData();

        return;
      }
  
      console.error(error);
    })

    return () => subscription.unsubscribe();
  }, [])
  
  const loadPoolData = async () => {

    // change to 2ND POOL INFO

    const extended = network.extendedPools.map((pool) => new web3.eth.Contract(DeFiat_FarmingExt.abi, pool.poolAddress));
    const values = await Promise.all(
      extended.map((pool) => pool.methods.poolMetrics().call())
    );
    setPoolMetrics(values);
    isLoading && setLoading(false);
  }

  const getWalletData = async () => {
    const rugContract = new web3.eth.Contract(contractAbi, ruggedCoins[selectedToken].contract)
    const values = await Promise.all([
      rugContract.methods.balanceOf(accounts[0]).call(),
      rugContract.methods.totalSupply().call(),
    ])
    const balance = parseValue(values[0])
    const totalSupply = parseValue(values[1])
    const shareOfSupply = 0
    const secondToReceive = 0
    setWalletState({
      balance,
      totalSupply,
      shareOfSupply: ((balance / totalSupply) * 100).toPrecision(3),
      secondToReceive: ((((balance / totalSupply) * 100).toPrecision(3)) * 1000).toFixed(2)
    });
    isLoading && setLoading(false);
  }

  const parseValue = (value) => {
    const wei = web3.utils.fromWei(value)
    return (Math.floor(parseFloat(wei * 100)) / 100).toFixed(2);
  }

  return (
    <>
      {isLoading ? (
        <div className="content-center">
          <Row className="justify-content-center">
            <Col lg="3">
              <img alt="loading" src={require("assets/img/Farm-Loading.gif")} />
            </Col>
          </Row>
        </div>
      ) : (
        <Container>
            <Row className="row-grid justify-content-between">
              <Col className="mt-lg-5" md="5">
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={recycle}
                    alt="recycle"
                    width="400"
                    height="auto"
                  />
                </div>
              </Col>
              <Col className="mt-lg-5" md="5">
                  <div className="pl-md-5">
                    <h1 className="text-primary">
                      Welcome to DeFiat Second Chance
                  </h1>
                    <p>
                      Many of you have played the Uniswap Casino and lost.
                      Rugpulls are unfortunately becoming far too common place in the DeFi community.
                      The DeFiat team cannot return value to your coins, but we CAN help you recycle them and give them NEW life!
                  </p>
                  <br />
                  <h1 className="text-tertiary">
                    <span className="text-primary font-weight-bold display-3">Recycle</span> <br />
                In Three Easy Steps!
              </h1>
                  </div>
              </Col>
            </Row>

            <Row>
              <Col>

                <Row className="row-grid justify-content-center">
                  <Col lg="4">
                    <div className="info">
                      <div className="icon icon-primary">
                        <span className="text-primary font-weight-bold display-3">1.</span>
                      </div>
                      <h4 className="info-title">Select coin to recycle</h4>
                      <hr className="line-primary secondChanceLine" />
                      <Input type="select" name="secondChanceSelect" id="secondChanceSelect" value={selectedToken} onChange={(e) => handleTokenChange(e)}>
                        {ruggedCoins.map(ruggedCoin => (
                          <option value={ruggedCoin.id}>{ruggedCoin.token}</option>
                            ))}
                      </Input>
                      <br />
                      <Button
                        color="primary"
                        className="secondChanceUniButtons"
                        onClick={() => checkBalance()}
                      >
                        Check Balance
                      </Button>
                      <hr className="line-primary secondChanceLine" />
                      <Card>
                        <CardBody>
                          <CardTitle className="text-primary card-title">{ruggedCoins[selectedToken].token}</CardTitle>
                          <CardSubtitle className="text-tertiary card-subtitle">Contract: {ruggedCoins[selectedToken].contract}</CardSubtitle>
                          <CardText>
                            Decimals: {ruggedCoins[selectedToken].decimals}
                          </CardText>

                          <br />

                          <Row>
                            <Col className="d-flex">
                              <DashboardCard
                                id="balance"
                                header={walletState.balance}
                                title={ruggedCoins[selectedToken].token + " Balance"}
                                color="info"
                                tooltip={"The total amount of " + ruggedCoins[selectedToken].token + " in your connected ERC20 wallet."}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="d-flex">
                              <DashboardCard
                                id="supply"
                                header={walletState.totalSupply}
                                title={"Total " + ruggedCoins[selectedToken].token + " Supply"}
                                color="info"
                                tooltip={"The total amount of " + ruggedCoins[selectedToken].token + " in existence."}
                              />
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </div>
                  </Col>
                  <Col lg="4">
                    <div className="info">
                      <div className="icon icon-primary">
                        {/* <i className="tim-icons icon-bank" /> */}
                        {/*<img src={require("assets/img/governance.png")} alt='gov' width="auto" height="50" */}
                        <span className="text-primary font-weight-bold display-3">2.</span>
                      </div>
                      <h4 className="info-title">Add your coins to the DeFiat Recycler</h4>
                      <hr className="line-primary secondChanceLine" />
                      <Container>
                        <Row>
                        <Card>
                          <CardBody className="secondChanceAddMargin">
                          <img className="mb-2 img-fluid secondChanceCard" src={recycle}/>
                          <CardTitle className="text-primary card-title">DeFiat Second Chance</CardTitle>
                            <CardSubtitle className="text-tertiary card-subtitle">Receive 2ND for helping save the DeFi Planet!</CardSubtitle>
                            <CardText>


                              <Row>
                                <Col className="d-flex">
                                  <DashboardCard
                                      id="percentage"
                                      header={walletState.shareOfSupply + "%"}
                                    title={"Percentage of " + ruggedCoins[selectedToken].token + " you own"}
                                    color="info"
                                    tooltip={"Percentage of " + ruggedCoins[selectedToken].token + " you own"}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col className="d-flex">
                                  <DashboardCard
                                      id="received"
                                      header={walletState.secondToReceive}
                                    title={"Amount of 2ND TOKENS you will receive"}
                                    color="info"
                                    tooltip={"% of " + ruggedCoins[selectedToken].token + " you own * 1000 = 2ND RECEIVED"}
                                  />
                                </Col>
                              </Row>
                            </CardText>
                            <Button
                              color="primary"
                                className="secondChanceUniButtons"
                                disabled={!canRecycle}
                              onClick={() => handleRecycle()}
                            >
                              Recycle
                          </Button>
                            </CardBody>
                            </Card>
                          </Row>

                        <Modal
                          modalClassName="modal-black"
                          isOpen={isOpen}
                          size="md"
                          toggle={handleToggle}
                        >
                          <ModalHeader
                            close={<button className="close" onClick={handleToggle}>&times;</button>}
                          >
                            <span className="text-primary display-4">Recycle {ruggedCoins[selectedToken].token}</span>
                          </ModalHeader>
                          <ModalBody>
                            <div className="d-flex justify-content-between align-items-center">
                              <p>Available Balance: </p>
                              <b>{walletState.balance}</b>
                            </div>
                            <Row>
                              <Col sm="8">
                                <Input
                                  type="number"
                                  value={recycleAmountInput}
                                  onChange={(e) => setRecycleAmountInput(e.target.value)}
                                  placeholder="Enter an amount..."
                                />
                              </Col>
                              <Col sm="4">
                                <Button
                                  className="m-0 w-100"
                                  color="primary"
                                  onClick={() => handleMax()}
                                >
                                  MAX
                                </Button>
                              </Col>
                            </Row>
                          </ModalBody>
                          <ModalFooter className="pt-2 justify-content-between">
                            <Button
                              className="m-0 w-100"
                              color="info"
                              onClick={console.log("button clicked")}
                            >
                              Recycle
                            </Button>
                          </ModalFooter>
                        </Modal>


                      </Container>
                    </div>
                  </Col>
                  <Col lg="4">
                    <div className="info">
                      <div className="icon icon-primary">
                        <span className="text-primary font-weight-bold display-3">3.</span>
                      </div>
                      <h4 className="info-title">Farm your 2ND!</h4>
                      <hr className="line-primary secondChanceLine"/>
                      <Switch>
                        <Route exact path={path}>
                          <Row className="justify-content-center mt-4 secondChancePoolMarginFix">
                            {network && network.extendedPools.map((pool, i) => (
                              <Col key={i}>
                                <PoolCard
                                  web3={web3}
                                  accounts={accounts}
                                  network={network}
                                  blockNumber={blockNumber}
                                  poolMetrics={poolMetrics[i]}
                                  isExtendedPool
                                  {...pool}
                                />

                                <h4 className="info-title">Uniswap Links</h4>
                                <hr className="line-primary secondChanceLine" />

                                <Card>
                                  <CardBody className="secondChanceUniswapLinksMargin">
                                    <Button
                                      color="primary"
                                      className="secondChanceUniButtons secondChanceSpecialMargin"
                                      href="https://app.uniswap.org/#/swap?inputCurrency=0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1"
                                      target="_blank"
                                    >
                                      Get DFT on Uniswap
                                    </Button>

                                    <Button
                                      color="primary"
                                      className="secondChanceUniButtons"
                                      href="https://app.uniswap.org/#/swap?inputCurrency=0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1"
                                      target="_blank"
                                    >
                                      Get UNI-V2 on Uniswap
                                    </Button>

                                    <Button
                                      color="primary"
                                      className="secondChanceUniButtons"
                                      href="https://app.uniswap.org/#/swap?inputCurrency=0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1"
                                      target="_blank"
                                    >
                                      Get 2ND on Uniswap
                                    </Button>
                                  </CardBody>
                                </Card>


                              </Col>
                            ))}
                          </Row>
                        </Route>
                        <Route path={`${path}/operator/:contractId`}>
                          <Operator
                            web3={web3}
                            accounts={accounts}
                            network={network}
                            isExtendedPool
                          />
                        </Route>
                        <Route path={`${path}/:contractId`}>
                          <PoolInterface
                            accounts={accounts}
                            web3={web3}
                            network={network}
                            isExtendedPool
                          />
                        </Route>
                      </Switch>
                    </div>
                  </Col>
                </Row>
                </Col>

            </Row>


        </Container>
      )}
    </>
  )
}
