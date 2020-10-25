import React from 'react'

export const ChanceDisplayRow = ({
  name,
  value,
  className
}) => {
  return (
    <div className={`d-flex align-items-center justify-content-between`}>
      <p className={className}>{name}</p>
      <p className={className}>{value}</p>
    </div>
  )
}
