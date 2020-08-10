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
          href="https://twitter.com/DeFiatCrypto"
          target="_blank"
        >
          <FaTwitter />
        </Button>
        <Button
          className="btn-icon btn-simple btn-round btn-neutral d-inline-flex justify-content-center align-items-center"
          color="default"
          href="https://t.me/defiat_crypto"
          target="_blank"
        >
          <FaTelegramPlane />
        </Button>
        <Button
          className="btn-icon btn-simple btn-round btn-neutral d-inline-flex justify-content-center align-items-center"
          color="default"
          href="https://discord.gg/fjHpaAr"
          target="_blank"
        >
          <FaDiscord />
        </Button>
      </div>
    </div>
  )
}