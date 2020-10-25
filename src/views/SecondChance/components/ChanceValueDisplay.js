import React, { useState } from 'react'
import { Col, Row, Tooltip } from 'reactstrap'
import { MdInfoOutline } from 'react-icons/md'

export const ChanceValueDisplay = ({
  id,
  value,
  color,
  tooltip,
  title
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div className="text-left w-100 my-3">
      <Tooltip placement="left" isOpen={tooltipOpen} target={`tooltip-${id}`} toggle={toggle}>
        {tooltip}
      </Tooltip>

      <div className="d-flex justify-content-between align-items-center mb-1">
        <h3 className="mb-0">{value}</h3>
        {/* <FiInfo className={`text-${color} hover`} height="30" /> */}
        <MdInfoOutline className={`text-${color} h3 mb-0`} id={`tooltip-${id}`} />
      </div>
      {/* <hr className={`line-${color}`} /> */}
      <p>{title}</p>
    </div>
  )
}
