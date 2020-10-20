import React from 'react';
import { HeaderSection } from './components/HeaderSection';
import { FeatureSection } from './components/FeatureSection';
import { StatSection } from './components/StatSection';
import { WhitepaperSection } from './components/WhitepaperSection'
import { Roadmap } from './components/Roadmap'
import { TokenomicsSection } from './components/TokenomicsSection'
import { TeamSection } from './components/TeamSection'

export const Landing = () => {
  return (
    <>
      <div className="landing-page">
        <div className="wrapper" style={{ overflow: 'hidden'}}>
          <HeaderSection />
          <FeatureSection />
          <StatSection />
          <WhitepaperSection />
          <Roadmap />
          <TokenomicsSection />
          <TeamSection />
        </div>
      </div>
    </>
  )
}
