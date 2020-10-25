import React from 'react'
import { Row, Col } from 'reactstrap'

export const ChanceFooter = () => {
  return (
    <Row className="row-grid justify-content-between align-items-center">
      <Col className="mt-lg-5" md="5">
        <div className="pl-md-5">
          <img 
            className="mb-2 img-fluid secondChanceCard" 
            src={require('assets/img/tractor-solid-purple.png')}
          />
        </div>
      </Col>
      <Col className="mt-lg-5" md="5">
        <div className="pl-md-5">
          <h1 className="text-primary">
            New Life
          </h1>
          <p>
            2ND offers its users an unruggable, deflationary farming experience.
            2ND keeps a variable fee, based on market buying and selling, that is
            charged on transfers. These fees are used to market buy 2ND and reward
            the farmers in the Rug Sanctuary.
          </p>
        </div>
      </Col>
    </Row>
  )
}
