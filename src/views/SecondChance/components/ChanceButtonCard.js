import React from 'react'
import { Card, CardBody, Button } from 'reactstrap'

export const ChanceButtonCard = ({
  secondAddress
}) => {
  return (
    <Card>
      <CardBody>
        <Button
          color="primary"
          className="w-100 mx-0"
          href={`https://app.uniswap.org/#/swap?inputCurrency=${secondAddress}`}
          target="_blank"
        >
          Get 2ND
        </Button>

        <Button
          color="primary"
          className="w-100 mx-0"
          href={`https://app.uniswap.org/#/add/${secondAddress}/ETH`}
          target="_blank"
        >
          Get 2ND-UNI-V2
        </Button>
      </CardBody>
    </Card>
  )
}
