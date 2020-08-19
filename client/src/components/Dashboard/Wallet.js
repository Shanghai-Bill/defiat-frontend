import React, { useEffect, useState } from 'react'
import { 
  Spinner,
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Button
} from 'reactstrap'
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
        burnRate: values[6],
        feeRate: values[7]
      });
      setLoading(false);
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
            if (currentLevel != previousLevel) {
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

  const transferToken = async () => {

  }

  return (
    <>
      {isLoading ? (
        <div className="content-center">
          <Row className="justify-content-center">
            <Col lg="3">
              <Card className="shadow-lg">
                <CardBody>
                  <Spinner color="primary" type="grow" />
                  <p>Loading...</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <Container>
          <Row>
            <Col lg="4" className="d-flex">
              <DashboardCard 
                header={walletState.balance}
                title="DFT Balance"
                color="info"
              />
            </Col>
            <Col lg="4" className="d-flex">
              <DashboardCard 
                header={walletState.totalSupply}
                title="Total DFT Supply"
                color="info"
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
                header={walletState.loyaltyPoints}
                title="DFT Points Balance"
                color="primary"
              />
            </Col>
            <Col lg="4" className="d-flex">
              <DashboardCard 
                header={`${walletState.discountRate}%`}
                title="Discount Rate"
                color="primary"
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
                header={`${walletState.feeRate}%`}
                title="Network Fee Rate"
                color="success"
              />
            </Col>
            <Col lg="4" className="d-flex">
              <DashboardCard
                header={`${walletState.burnRate}%`}
                title="Network Burn Rate"
                color="success"
              />
            </Col>
            <Col lg="4" className="d-flex">
              <Card>
                <CardBody className="d-flex align-items-center justify-content-center">
                  <div>
                    <Button 
                      className="m-100"
                      color="success"
                      href="https://app.uniswap.org/#/swap"
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
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

const DashboardCard = ({
  header,
  title,
  color
}) => {
  return (
    <Card className="shadow">
      <CardBody className="text-left">
        <h3>{header}</h3>
        <hr className={`line-${color}`} />
        <p>{title}</p>
      </CardBody>
    </Card>
  )
}