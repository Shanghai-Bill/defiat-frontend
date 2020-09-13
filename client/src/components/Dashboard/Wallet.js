import React, { useEffect, useState } from 'react'
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Button
} from 'reactstrap'
import { DashboardCard } from './DashboardCard'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { TooltipMessage } from '../TooltipMessage'
import Uni_Price from 'contracts/Uni_Price.json'
import UniV2_Pair from 'contracts/IUniswapV2Pair.json'

export const Wallet = ({
  web3,
  accounts,
  contracts,
  network
}) => {
  const [isLoading, setLoading] = useState(true);
  const [isUpdating, setUpdating] = useState(false);
  const [walletState, setWalletState] = useState({
    balance: 0,
    discountRate: 0,
    loyaltyPoints: 0,
    totalSupply: 0,
    burnRate: 0,
    feeRate: 0
  })
  const [blockNumber, setBlockNumber] = useState(0);

  useEffect(() => {
    getWalletData();
    const subscription = web3.eth.subscribe('newBlockHeaders', (error, result) => {
      if (!error) {
        setBlockNumber(result.number);
        getWalletData();
        return;
      }
      console.error(error);
    })

    return () => subscription.unsubscribe();
  }, []);

  const getWalletData = async () => {
    const values = await Promise.all([
      contracts["token"].methods.balanceOf(accounts[0]).call(),
      contracts["token"].methods.totalSupply().call(),
      contracts["points"].methods.balanceOf(accounts[0]).call(),
      contracts["points"].methods.viewDiscountOf(accounts[0]).call(),
      contracts["gov"].methods.viewBurnRate().call(),
      contracts["gov"].methods.viewFeeRate().call()
    ])
    const balance = parseValue(values[0])
    const totalSupply = parseValue(values[1])
    const loyaltyPoints = parseValue(values[2])
    setWalletState({
      balance,
      totalSupply,
      loyaltyPoints,
      discountRate: (+values[3]).toFixed(2),
      burnRate: (values[4] / 100).toFixed(2),
      feeRate: (values[5] / 100).toFixed(2)
    });
    isLoading && setLoading(false);
  }

  const parseValue = (value) => {
    const wei = web3.utils.fromWei(value)
    return (Math.floor(parseFloat(wei * 100)) / 100).toFixed(2);
  }

  const checkDiscount = async () => {
    const currentLevel = await contracts["points"].methods.viewEligibilityOf(accounts[0]).call();
    const nextLevelPoints = await contracts["points"].methods._discountTranches(currentLevel+1).call();
    const loyaltyPointsNeeded = (nextLevelPoints / 1e18) - (walletState.loyaltyPoints / 1e18);
    console.log(currentLevel, nextLevelPoints, loyaltyPointsNeeded)

    if (loyaltyPointsNeeded > 0) {
      toast.success(<TooltipMessage title="✅ Eligible" message="You are eligible for the next Discount Tier! Click Update Discount!" />)
    } else {
      toast.warn(<TooltipMessage title="⚠️ Not Eligible" message={`You are not eligible for the next Discount Tier yet. You need ${loyaltyPointsNeeded} more loyalty points for the next level.`} />)
    }
  }

  const updateDiscount = async () => {
    setUpdating(true);
    const previousLevel = await contracts["points"].methods.viewEligibilityOf(accounts[0]).call();
    contracts["points"].methods.updateMyDiscountOf().send({from: accounts[0]})
      .then(() => {
        contracts["points"].methods.viewEligibilityOf(accounts[0]).call()
          .then((currentLevel) => {
            if (currentLevel !== previousLevel) {
              contracts["points"].methods.viewDiscountOf(accounts[0]).call()
                .then((discountRate) => {
                  toast.success(<TooltipMessage title="✅ Success" message={`Successfully updated discount. You are now Discount Tier ${currentLevel}.`} />);
                  setWalletState({
                    ...walletState,
                    discountRate
                  })
                  setUpdating(false);
                })
            } else {
              toast.error(<TooltipMessage title="⛔️ Error" message="Could not update discount. Check your eligibility and try again." />)
              setUpdating(false);
            }
          });
      })
      .catch(() => {
        setUpdating(false);
      })
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
          {/* <h1 className="text-left mt-2 mb-4">Block Number: <b>{blockNumber}</b></h1> */}
          <Row>
            <Col lg="4" className="d-flex">
              <DashboardCard 
                id="balance"
                header={walletState.balance}
                title="DFT Balance"
                color="info"
                tooltip="The total amount of DFT in your connected ERC20 wallet."
              />
            </Col>
            <Col lg="4" className="d-flex">
              <DashboardCard 
                id="supply"
                header={walletState.totalSupply}
                title="Total DFT Supply"
                color="info"
                tooltip="The total amount of DFT in existence. Initial supply of 500K."
              />
            </Col>
            <Col lg="4" className="d-flex">
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <div>
                        <Button 
                          className="w-100"
                          color="info"
                          target="_blank"
                          href={`https://etherscan.io/address/${network["token"]}`}  
                        >
                          DFT Contract
                        </Button>
                      </div>
                      <div>
                        <Button
                          className="w-100"
                          color="info"
                          target="_blank"
                          href={`https://etherscan.io/address/${network["points"]}`}
                        >
                          DFT.Points Contract
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4" className="d-flex">
              <DashboardCard 
                id="points"
                header={walletState.loyaltyPoints}
                title="DFT Points Balance"
                color="primary"
                tooltip="The total amount of DFTP in your connected ERC20 wallet. Holding DFTP makes you eligible for new Discount Levels."
              />
            </Col>
            <Col lg="4" className="d-flex">
              <DashboardCard
                id="discount"
                header={`${walletState.discountRate}%`}
                title="Discount Rate"
                color="primary"
                tooltip="The discount rate you receive on the base network fee and burn rates."
              />
            </Col>
            <Col lg="4" className="d-flex">
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <div>
                        <Button 
                          className="w-100"
                          color="primary"
                          onClick={() => checkDiscount()}
                        >
                          Check Discount Eligibility
                        </Button>
                      </div>
                      <div>
                        <Button 
                          className="w-100" 
                          color="primary"
                          onClick={() => updateDiscount()}
                          disabled={isUpdating}
                        >
                          {!isUpdating ? "Update Discount" : "Updating Discount..."}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4" className="d-flex">
              <DashboardCard
                id="fees"
                header={`${walletState.feeRate}%`}
                title="Network Fee Rate"
                color="success"
                tooltip="The base fee rate taken from each transaction on the network (excluding exchanges). Fees taken are redistributed through DFT staking rewards."
              />
            </Col>
            <Col lg="4" className="d-flex">
              <DashboardCard
                id="burn"
                header={`${walletState.burnRate}%`}
                title="Network Burn Rate"
                color="success"
                tooltip="The base burn rate taken from each transaction on the network (excluding exchanges). Burned DFT are removed from the total supply and are unable to be transferred or spent."
              />
            </Col>
            <Col lg="4" className="d-flex">
              <Card>
                <CardBody className="d-flex align-items-center justify-content-center w-100">
                  <Row>
                    <Col>
                      <div>
                        <Button 
                          className="w-100"
                          color="success"
                          href={`https://app.uniswap.org/#/swap?inputCurrency=${network["token"]}`}
                          target="_blank"
                        >
                          Buy DFT on UniSwap
                        </Button>
                      </div>
                      <div>
                        <Button 
                          className="w-100"
                          color="success"
                          href="/"
                        >
                          Back To Home
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}