import React from 'react'
import { Col, Row } from 'reactstrap'

export const ChanceStep = ({ stepNumber, stepMessage, children }) => {
  return (
    <Col lg={4} className="h-100">
      <div className="icon icon-primary">
        <span className="text-primary font-weight-bold display-3">
          {stepNumber}
        </span>
      </div>
      <h4 className="info-title">
        {stepMessage}
      </h4>
      <hr className="line-primary secondChanceLine" />
      {children}
    </Col>
  )
}
