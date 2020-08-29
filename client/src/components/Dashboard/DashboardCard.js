import React, { useState } from 'react'
import {
  Card,
  CardBody,
  Tooltip
} from 'reactstrap'
import { FiInfo } from 'react-icons/fi'
import { MdInfoOutline } from 'react-icons/md'

export const DashboardCard = ({
  id,
  header,
  title,
  color,
  tooltip
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Card className="shadow">
      <CardBody className="text-left">
        <Tooltip placement="left" isOpen={tooltipOpen} target={`tooltip-${id}`} toggle={toggle}>
          {tooltip}
        </Tooltip>

        <div className=" d-flex justify-content-between mb-2">
          <h3 className="mb-0">{header}</h3>
          {/* <FiInfo className={`text-${color} hover`} height="30" /> */}
          <MdInfoOutline className={`text-${color} h3 mb-0`} id={`tooltip-${id}`} />
        </div>
        <hr className={`line-${color}`} />
        <p>{title}</p>
      </CardBody>
    </Card>
  )
}