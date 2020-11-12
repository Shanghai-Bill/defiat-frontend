import React from 'react'
import { Container, Row, Col } from 'reactstrap'

export const PoolCardDisplayRow = ({
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