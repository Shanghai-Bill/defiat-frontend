import React from 'react'
import { Col, Row } from 'reactstrap'
import { FlexCenter } from 'components/FlexCenter'

export const ChanceHeader = () => {
  return (
    <>
      <FlexCenter>
        <img
          src={require('assets/img/2nd-brand-full.png')}
          alt="2nd-brand"
          width="100%"
          height="auto"
        />
      </FlexCenter>
      <Row className="row-grid justify-content-between align-items-center">
        <Col className="mt-lg-5" md="5">
          <div className="pl-md-5">
            <h1 className="text-primary">
              DeFiat Second Chance
            </h1>
            <p>
              Many of you have played the Uniswap Casino and lost.
              Rugpulls are unfortunately becoming far too common place in the DeFi community.
              The DeFiat team cannot return value to your coins, but we CAN help you recycle them and give them NEW life!
            </p>
          </div>
        </Col>
        <Col className="mt-lg-5" md="5">
          <img
            className="mb-2"
            src={require('assets/img/recycle-solid-purple.png')}
            alt="recycle"
            width="auto"
            height="150px"
          />
          <h1 className="text-tertiary">
            <span className="text-primary font-weight-bold display-3">Recycle</span> <br />
            In Three Easy Steps!
          </h1>
        </Col>
      </Row>
    </>
  )
}
