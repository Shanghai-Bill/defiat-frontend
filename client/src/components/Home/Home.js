import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export function Home(props) {
  const {
    intl,
    web3,
  } = props;
  const web3Status = web3 && web3.status !== 'failed' ? 'Connected' : 'NotConnected';

  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png")}
          />
          
          <div className="content-center">
            <h1>
              {intl.formatMessage({ id: web3Status })} <br/>
              Status Message
            </h1>

            <Link to="/landing">Landing</Link>
          </div>
        </div>
      </div>
    </>
  );
}

Home.propTypes = {
  web3: PropTypes.object,
  intl: PropTypes.object.isRequired
};

Home.defaultProps = {
  web3: null,
};

export default injectIntl(Home);
