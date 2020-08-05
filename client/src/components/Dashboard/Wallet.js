import React from 'react'

import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody
} from 'reactstrap'

export const Wallet = () => {
  return (
    <>
    {/* Wallet Stats */}
      <Row>
        <Col>
          <Card className="mr-4">
            <CardHeader>
              <CardTitle className="font-weight-bold h3 display-2">10K</CardTitle>
            </CardHeader>
            <CardBody>
              DFT Available Balance
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="mr-4">
            <CardHeader>
              <CardTitle className="font-weight-bold h3 display-2">10K</CardTitle>
            </CardHeader>
            <CardBody>
              DFT Staked Balance
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="mr-4"> 
            <CardHeader>
              <CardTitle className="font-weight-bold h3 display-2">2.0%</CardTitle>
            </CardHeader>
            <CardBody>
              Discount Rate
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle className="font-weight-bold h3 display-2">1.2K</CardTitle>
            </CardHeader>
            <CardBody>
              Loyalty Points
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <FormGroup className="w-100 d-flex flex-column align-items-start justify-content-start">
                <Label for="disabled" className="text-lg">Connected Ethereum Address:</Label>
                <Input type="text" id="disabled" value="0x00000000000000000000000000000000000000000"  disabled/>
              </FormGroup>
              <FormGroup className="w-100 d-flex flex-column align-items-start justify-content-start">
                <Label for="disabled2" className="text-lg">Contract Ethereum Address:</Label>
                <Input type="text" id="disabled2" value="0x0000000000000000000000000000000000000000"  disabled/>
              </FormGroup>
              <div class="d-flex">
                <Button color="primary">
                  View Contract on Etherscan
                </Button>
                <Button color="success">
                  Buy DeFiat on Uniswap
                </Button>
              </div>
              
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}