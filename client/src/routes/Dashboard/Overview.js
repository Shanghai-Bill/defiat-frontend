import React, { useState } from 'react';
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Button
} from 'reactstrap';
import { DashboardCard } from './DashboardCard';
import { useDeFiat } from 'hooks/useDeFiat'
import { useOverview } from 'hooks/useOverview';
import { useNetwork } from 'hooks/useNetwork';
import OverviewProvider from 'contexts/Overview';
import { getTokenContract, getPointsContract } from '../../defiat'

export const Overview = () => {
  const defiat = useDeFiat();
  const { getEtherscanAddress, getUniswapAddress } = useNetwork();
  const {
    burnRate,
    discountRate,
    feeRate,
    pointsBalance,
    tokenBalance,
    totalSupply,
    handleCheckDiscount,
    handleUpdateDiscount
  } = useOverview();


  const [isUpdating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    setUpdating(true);
    await handleUpdateDiscount();
    setUpdating(false);
  }

  return (
    <OverviewProvider>
      <Container>
        <Row>
          <Col lg="4" className="d-flex">
            <DashboardCard 
              id="balance"
              header={tokenBalance}
              title="DFT Balance"
              color="info"
              tooltip="The total amount of DFT in your connected ERC20 wallet."
            />
          </Col>
          <Col lg="4" className="d-flex">
            <DashboardCard 
              id="supply"
              header={totalSupply}
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
                        href={getEtherscanAddress(getTokenContract(defiat))}  
                      >
                        DFT Contract
                      </Button>
                    </div>
                    <div>
                      <Button
                        className="w-100"
                        color="info"
                        target="_blank"
                        href={getEtherscanAddress(getPointsContract(defiat))}
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
              header={pointsBalance}
              title="DFT Points Balance"
              color="primary"
              tooltip="The total amount of DFTP in your connected ERC20 wallet. Holding DFTP makes you eligible for new Discount Levels."
            />
          </Col>
          <Col lg="4" className="d-flex">
            <DashboardCard
              id="discount"
              header={`${discountRate}%`}
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
                        onClick={handleCheckDiscount}
                      >
                        Check Discount Eligibility
                      </Button>
                    </div>
                    <div>
                      <Button 
                        className="w-100" 
                        color="primary"
                        onClick={handleUpdate}
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
              header={`${feeRate}%`}
              title="Network Fee Rate"
              color="success"
              tooltip="The base fee rate taken from each transaction on the network (excluding exchanges). Fees taken are redistributed through DFT staking rewards."
            />
          </Col>
          <Col lg="4" className="d-flex">
            <DashboardCard
              id="burn"
              header={`${burnRate}%`}
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
                        href={getUniswapAddress(getTokenContract(defiat))}
                        target="_blank"
                      >
                        View DFT on UniSwap
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

    </OverviewProvider>
  )
}