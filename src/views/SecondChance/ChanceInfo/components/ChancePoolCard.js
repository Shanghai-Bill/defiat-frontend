import React, { useMemo, useEffect } from 'react'
import { 
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Container,
  CardText
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Rug_Sanctuary from 'contracts/secondchance/Rug_Sanctuary.json'

export const ChancePoolCard = ({
  web3,
  accounts,
  network
}) => {
  const { secondPool } = network
  const {
    poolAddress,
    poolLogo,
    poolTitle,
    poolSubtitle
  } = secondPool
  const history = useHistory()

  const rugSanctuaryContract = useMemo(() => {
    return ''//return new web3.eth.Contract(Rug_Sanctuary.abi, poolAddress)
  }, [web3, accounts]) 

  const handleLink = () => {
    history.push(`/dashboard/secondchance/${poolAddress}`)
  }

  return (
    <Card className="shadow">
      <CardBody>
        <img className="mb-2 img-fluid" src={poolLogo} alt="" style={{height: 100, width: "auto"}} />
        <CardTitle className="text-primary"><b>{poolTitle}</b></CardTitle>
        <CardSubtitle className="text-tertiary">{poolSubtitle}</CardSubtitle>
        <CardText>Repurposing your rugs to create sustainable yield farming opportunities!</CardText>
        <div className="mt-2 mb-2">
          {/* {!isPoolClosed && <DisplayRow title="Total Staked:" value={totalStaked} /> } */}
          {/* <DisplayRow title="Pool Rewards:" value={totalRewards} /> */}
          
          {/* <DisplayRow title="Pool Opens:" value={poolOpen} />
          <DisplayRow title="Pool Closes:" value={poolClose} />
          
          <DisplayRow title="Entry Fee:" value={poolFee} />
          
          {!isPoolClosed && <DisplayRow title="APR:" value={poolApr + "%"} />} */}
        </div>
        <Button 
          className="w-100"
          color="primary"
          onClick={() => handleLink()}
        >
          Go To Pool
        </Button>
      </CardBody>
    </Card>
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