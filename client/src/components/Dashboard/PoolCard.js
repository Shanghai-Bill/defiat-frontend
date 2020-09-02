import React, {useEffect} from 'react'
import { 
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Row,
  Col,
  Container
} from 'reactstrap'
import { Link } from 'react-router-dom'
import IERC20 from 'contracts/_ERC20.json'

export const PoolCard = ({
  logo,
  poolTitle,
  poolSubtitle,
  poolAddress,
  poolMetrics,
  rewardSymbol,
  stakedSymbol
}) => {
  const isPoolOpen = new Date().getTime() > +poolMetrics.startTime * 1000;

  const totalStaked = (poolMetrics.staked / 1e18).toFixed(2) + " " + stakedSymbol; // make this modular
  const totalRewards = (poolMetrics.rewards / 1e18).toFixed(2) + " " + rewardSymbol;
  const poolOpen = new Date(+poolMetrics.startTime * 1000).toLocaleDateString()
  const poolClose = new Date(+poolMetrics.closingTime * 1000).toLocaleDateString()
  const poolFee = (+poolMetrics.stakingFee / 10).toFixed(2) + "%";


  const apy = () => {
    const timeRemaining = +poolMetrics.closingTime - +(new Date().getTime())
    const rate = ((poolMetrics.rewards / 1e18) / timeRemaining) ;
    console.log(rate)


    return 0 

  }



  return (
    <>
      <Card className="shadow">
        <CardBody>
          <img className="mb-2 img-fluid" src={logo} alt="" style={{height: 100, width: "auto"}} />
          <CardTitle className="text-primary"><b>{poolTitle}</b></CardTitle>
          <CardSubtitle className="text-tertiary">{poolSubtitle}</CardSubtitle>
          <div className="mt-2 mb-2">

            <DisplayRow title="Total Staked:" value={totalStaked} />
            <DisplayRow title="Pool Rewards:" value={totalRewards} />
            
            <DisplayRow title="Pool Opens:" value={poolOpen} />
            <DisplayRow title="Pool Closes:" value={poolClose} />
            
            <DisplayRow title="Pool Fee:" value={poolFee} />
            {/* <DisplayRow title="APY:" value={apy() + "%"} /> */}
          </div>
            
            <Button 
              className="w-100"
              color="primary" 
              disabled={!isPoolOpen || poolMetrics.rewards == 0}
              href={`/dashboard/staking/${poolAddress}`}
            >
              Go To Pool
            </Button>
        </CardBody>
      </Card>
    </>
  )
}

const DisplayRow = ({
  title,
  value
}) => {
  return (
    <Container>
      <Row>
        <Col className="text-left">{title}</Col>
        <Col className="text-right"><b>{value}</b></Col>
      </Row>
    </Container>
  )
}