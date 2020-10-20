import React from 'react'

export const PageWrapper = ({ children }) => {
  return (
    <div className="wrapper">
      <div className="page-header">
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}
