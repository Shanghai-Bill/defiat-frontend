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
import { useHistory } from 'react-router-dom'

export const PoolCard = ({
  logo,
  poolTitle,
  poolSubtitle,
  poolAddress,
  poolMetrics,
  rewardSymbol,
  stakedSymbol
}) => {
  const history = useHistory();

  const isPoolOpen = new Date().getTime() > +poolMetrics.startTime * 1000;

  const totalStaked = (poolMetrics.staked / 1e18).toFixed(2) + " " + stakedSymbol; // make this modular
  const totalRewards = (poolMetrics.rewards / 1e18).toFixed(2) + " " + rewardSymbol;
  const poolOpen = new Date(+poolMetrics.startTime * 1000).toLocaleDateString()
  const poolClose = new Date(+poolMetrics.closingTime * 1000).toLocaleDateString()
  const poolFee = (+poolMetrics.stakingFee / 10).toFixed(2) + "%";


  const apy = () => {
    // calculate time remaining (ms) and convert to hours
    const timeRemainingInHours = ((+poolMetrics.closingTime * 1000) - new Date().getTime()) / 3600000;
    // rewards remaining per hour
    const rewardsPerHour = ((poolMetrics.rewards / 1e18) / timeRemainingInHours);
    // rewards distributed per hour per 1 staked token
    const rewardsPerHourPerToken = rewardsPerHour / (poolMetrics.staked / 1e18);
    // annual simple rate 
    const tokensPerYear = rewardsPerHourPerToken * 24 * 365;
    // convert to percentage
    const rate = tokensPerYear * 100;
    return rate.toFixed(2);
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
            {/* <DisplayRow title="Pool Rewards:" value={totalRewards} /> */}
            
            <DisplayRow title="Pool Opens:" value={poolOpen} />
            <DisplayRow title="Pool Closes:" value={poolClose} />
            
            <DisplayRow title="Pool Fee:" value={poolFee} />
            <DisplayRow title="APY:" value={apy() + "%"} />
          </div>
            
            <Button 
              className="w-100"
              color="primary" 
              disabled={!isPoolOpen || poolMetrics.rewards == 0}
              onClick={() => history.push(`/dashboard/staking/${poolAddress}`)}
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