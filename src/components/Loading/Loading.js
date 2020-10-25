import React from 'react'
import { Row, Col } from 'reactstrap'

export const Loading = () => {
  return (
    <div className="content-center">
      <Row className="justify-content-center">
        <Col lg="3">
          <img alt="loading" src={require("assets/img/Farm-Loading.gif")} />
        </Col>
      </Row>
    </div>
  )
}


