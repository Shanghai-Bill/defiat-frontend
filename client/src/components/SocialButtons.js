import React from 'react'
import { FaTwitter, FaDiscord, FaTelegramPlane } from 'react-icons/fa'
import { Button } from 'reactstrap'

export const SocialButtons = () => {
  return (
    <div className="btn-wrapper">
      <div className="button-container">
        <Button
          className="btn-icon btn-simple btn-round btn-neutral d-inline-flex justify-content-center align-items-center"
          color="default"
          href="#"
          onClick={e => e.preventDefault()}
        >
          <FaTwitter />
        </Button>
        <Button
          className="btn-icon btn-simple btn-round btn-neutral d-inline-flex justify-content-center align-items-center"
          color="default"
          href="#"
          onClick={e => e.preventDefault()}
        >
          <FaTelegramPlane />
        </Button>
        <Button
          className="btn-icon btn-simple btn-round btn-neutral d-inline-flex justify-content-center align-items-center"
          color="default"
          href="#"
          onClick={e => e.preventDefault()}
        >
          <FaDiscord />
        </Button>
      </div>
    </div>
  )
}