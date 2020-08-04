import { drizzleConnect } from 'drizzle-react';

import Landing from './Landing';

function mapState(state) {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    // MyStringStore: state.contracts.MyStringStore,
    web3: state.web3,
  };
}

function mapDispatch(/* dispatch */) {
  return {};
}

export default drizzleConnect(Landing, mapState, mapDispatch);
