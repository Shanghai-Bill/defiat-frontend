import React from 'react'

export const FlexCenter = ({ children }) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      {children}
    </div>
  )
}
