import React from 'react';
import { HeaderSection } from './HeaderSection';
import { FeatureSection } from './FeatureSection';
import { StatSection } from './StatSection';

export const Landing = () => {
  return (
    <>
      <div className="landing-page">
        <div className="wrapper" style={{ overflow: 'hidden'}}>
          <HeaderSection />
          <FeatureSection />
          <StatSection />
        </div>
      </div>
    </>
  )
}
