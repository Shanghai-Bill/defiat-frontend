import React from 'react'
import { WhitepaperSection } from './WhitepaperSection'
import { TeamSection } from './TeamSection'
import { TokenomicsSection } from './TokenomicsSection'
import { Roadmap } from './Roadmap'

export const About = () => {
  return (
    <>
      <div className="wrapper">
        <div className="content">
          <WhitepaperSection />
          <Roadmap />
          <TokenomicsSection />
          <TeamSection />
        </div>
      </div>
    </>
  )
}