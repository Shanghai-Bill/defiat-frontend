import React from 'react'
import { Card, CardBody } from 'reactstrap'

export const AboutCard = ({title, children}) => {
  return (
    <Card className="shadow">
      <CardBody className="text-left">
        <h4 className="info-title">{title}</h4>
        <hr className="line-primary" />
        {children}
      </CardBody>
    </Card>
  )
}
