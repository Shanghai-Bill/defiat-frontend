import React from 'react'
import {
  Card,
  CardBody
} from 'reactstrap'

export const DashboardCard = ({
  header,
  title,
  color
}) => {
  return (
    <Card className="shadow">
      <CardBody className="text-left">
        <h3>{header}</h3>
        <hr className={`line-${color}`} />
        <p>{title}</p>
      </CardBody>
    </Card>
  )
}