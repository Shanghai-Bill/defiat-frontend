import React from 'react';
import PropTypes from 'prop-types';
import { HeaderSection } from './HeaderSection';
import { FeatureSection } from './FeatureSection';
import { StatSection } from './StatSection';

export const Landing = (props) => {
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

Landing.propTypes = {
  web3: PropTypes.object,
};

Landing.defaultProps = {
  web3: null,
};
