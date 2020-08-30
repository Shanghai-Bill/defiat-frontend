import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap'

export const NoWallet = () => {
  return (
    <>
      <Row className="justify-content-center">
        <Col md="3">
        <div className="d-inline-flex align-items-center justify-space-around">
          <img className="mr-2" style={{ height: "50px", width: "50px", marginTop: "0"}} src={require('assets/img/defiat.png')} alt="logo" />
          <h1 className="title m-0">DeFiat</h1>
        </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg="6">
          <h3>
            Please connect your Ethereum wallet via Metamask
            or another browser-based extension to access the DeFiat Dashboard.
          </h3>
        </Col>
      </Row>     
    </>
  )
}