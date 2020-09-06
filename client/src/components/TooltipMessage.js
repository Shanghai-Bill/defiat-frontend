import React from 'react'

export const TooltipMessage = ({
  title,
  message,
  link
}) => {
  return (
    <>
      <>
        <h3 className="mb-1">{title}</h3>
        <p>{message}</p>
        {link && (<p><a href={link}>View Here</a></p>)}
      </>
    </>
  )
}
