import React from 'react'

import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  // Card,
  // CardHeader,
  // CardTitle,
  // CardBody
} from 'reactstrap'

export const Wallet = () => {
  return (
    <>
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
          <Button color="success">
            Buy on Uniswap
          </Button>
        </Col>
        {/* <Col md="6">
          {/* <h2 className='d-flex align-items-center justify-content-center w-100 h-100'> 
          <div className="d-flex justify-content-center flex-column">
            <Label>Available Balance</Label>
            <h2>
              100.2378899 DFT
            </h2>
            <Label>Staked Balance</Label>
            <h2>
              2.6K DFT
            </h2>
          </div>
        </Col> */}
      </Row>
    </>
  )
}