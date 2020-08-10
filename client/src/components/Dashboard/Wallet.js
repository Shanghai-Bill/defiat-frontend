import React, { useEffect, useState } from 'react'
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
import HRNumbers from 'human-readable-numbers'

export const Wallet = ({
  web3,
  accounts,
  contract,
  network
}) => {
  const [walletState, setWalletState] = useState({
    balance: 0,
    staked: 0,
    discountRate: 0,
    loyaltyPoints: 0
  })

  useEffect(() => {
    async function getWalletData() {
      if(contract && contract.methods){
        console.log(contract.methods)
        //console.log(contract.methods.balanceOf)
        const balance = await contract.methods.balanceOf(accounts[0]).call();
        //const discountRate = await contract.methods.currentDiscountOf(accounts[0]).call();
        //const loyaltyPoints = await contract.methods.showLoyaltyPointsOf(accounts[0]).call();
        //console.log(balance, discountRate, loyaltyPoints)
        setWalletState({
          ...walletState,
          balance,
          //discountRate,
          //loyaltyPoints
        })}
    }
    getWalletData()
  }, [contract])

  return (
    <>
      <Row>
        <Col>
          <Card className="mr-4">
            <CardHeader>
              <CardTitle className="font-weight-bold h3 display-2">{HRNumbers.toHumanString(walletState.balance)}</CardTitle>
            </CardHeader>
            <CardBody>
              Available DFT
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="mr-4">
            <CardHeader>
              <CardTitle className="font-weight-bold h3 display-2">{HRNumbers.toHumanString(walletState.staked)}</CardTitle>
            </CardHeader>
            <CardBody>
              Staked DFT
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle className="font-weight-bold h3 display-2">{HRNumbers.toHumanString(walletState.loyaltyPoints)}</CardTitle>
            </CardHeader>
            <CardBody>
              Loyalty Points
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="mr-4"> 
            <CardHeader>
              <CardTitle className="font-weight-bold h3 display-2">{HRNumbers.toHumanString(walletState.discountRate)}</CardTitle>
            </CardHeader>
            <CardBody>
              Discount Rate
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
                <Input type="text" id="disabled" value={accounts[0]}  disabled/>
              </FormGroup>
              <FormGroup className="w-100 d-flex flex-column align-items-start justify-content-start">
                <Label for="disabled2" className="text-lg">Contract Ethereum Address:</Label>
                <Input type="text" id="disabled2" value={network && network.address}  disabled/>
              </FormGroup>
              <div className="d-flex">
                <Button 
                  color="primary"
                  href={`https://etherscan.io/address/${network && network.address}`} 
                >
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