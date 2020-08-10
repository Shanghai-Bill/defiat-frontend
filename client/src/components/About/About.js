import React from 'react'
import { WhitepaperSection } from './WhitepaperSection'
import { TeamSection } from './TeamSection'
import { TokenomicsSection } from './TokenomicsSection'

export const About = () => {
  return (
    <>
      <div className="wrapper">
        <div className="content">
          <WhitepaperSection />
          <TokenomicsSection />
          <TeamSection />
        </div>
      </div>
    </>
  )
}