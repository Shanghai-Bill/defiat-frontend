import React from 'react'

import {
  Card,
  CardText,
  CardBody,
  Col,
  CardTitle,
  CardSubtitle
} from 'reactstrap'

export const TeamCard = ({
  imageSrc,
  cardTitle,
  cardSubtitle,
  email
}) => {
  return (
    <Col md="3">
      <Card className="mr-4">
        <CardBody>
          <img className="m-2" src={imageSrc} alt="" height="100" width="100" />
          <CardTitle>{cardTitle}</CardTitle>
          <CardSubtitle>{cardSubtitle}</CardSubtitle>
          <CardText><a href={`mailto:${email}`}>{email}</a></CardText>
        </CardBody>
      </Card>
    </Col>
  )
}