import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

export const BackButton = (link) => {
  return (
    <div className="d-flex justify-content-start">
      <Link to={link}>
        <Button
          className="btn-link"
          color="success"
          size="sm"
        >
          <i className="tim-icons icon-minimal-left" />
        </Button>
        <p className="category text-success d-inline">
          Go Back
        </p>
      </Link>
    </div>
  )
}
