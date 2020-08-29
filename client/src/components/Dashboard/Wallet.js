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

export const Wallet = ({
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

  useEffect(() => {
    async function getWalletData() {
      const values = await Promise.all([
        contracts["token"].methods.decimals().call(),
        contracts["token"].methods.balanceOf(accounts[0]).call(),
        contracts["token"].methods.totalSupply().call(),
        contracts["points"].methods.decimals().call(),
        contracts["points"].methods.balanceOf(accounts[0]).call(),
        contracts["points"].methods.viewDiscountOf(accounts[0]).call(),
        contracts["gov"].methods.viewBurnRate().call(),
        contracts["gov"].methods.viewFeeRate().call(),
        contracts["token"].methods.symbol().call()
      ])
      const balance = (+values[1] / (10 ** +values[0])).toFixed(2)
      const totalSupply = (+values[2] / (10 ** +values[0])).toFixed(2)
      const loyaltyPoints = +values[4] / (10 ** +values[3])
      setWalletState({
        balance,
        totalSupply,
        loyaltyPoints,
        discountRate: values[5],
        burnRate: values[6] / 100,
        feeRate: values[7] / 100
      });
      setLoading(false);
      //console.log(contracts)
    }
    getWalletData();
  }, []);

  const checkDiscount = async () => {
    const decimals = await contracts["points"].methods.decimals().call();
    const currentLevel = await contracts["points"].methods.viewEligibilityOf(accounts[0]).call();
    const nextLevelPoints = await contracts["points"].methods._discountTranches(currentLevel+1).call();
    const loyaltyPointsNeeded = (nextLevelPoints - walletState.loyaltyPoints) / (10 ** decimals);

    if (loyaltyPointsNeeded <= 0) {
      toast.success("✅ You are eligible for the next Discount Tier! Click Update Discount!")
    } else {
      toast.warn(`⚠️ You are not eligible for the next Discount Tier yet. You need ${loyaltyPointsNeeded} more loyalty points for the next level.`)
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
                  toast.success(`✅ Successfully updated discount. You are now Discount Tier ${currentLevel}.`);
                  setWalletState({
                    ...walletState,
                    discountRate
                  })
                  setUpdating(false);
                })
            } else {
              toast.error("⛔️ Could not update discount. Check your eligibility and try again.")
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
              <img alt="loading" src={require("assets/img/LoadingScales.gif")} />
            </Col>
          </Row>
        </div>
      ) : (
        <Container>
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
                    <Button 
                      className="w-100"
                      color="success"
                      href={`https://app.uniswap.org/#/swap?inputCurrency=${network["token"]}`}
                      target="_blank"
                    >
                      Buy DFT on UniSwap
                    </Button>
                    {/* <Button 
                      className="m-100"
                      color="success"
                      onClick={() => transferToken()}
                    >
                      Send DFT
                    </Button> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}