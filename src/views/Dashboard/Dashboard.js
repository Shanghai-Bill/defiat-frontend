import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import getWeb3 from 'utils/getWeb3'
import constants from '../../constants'
import { connect } from 'react-redux'
import DeFiat_Token from 'contracts/DeFiat_Token.json'
import DeFiat_Points from 'contracts/DeFiat_Points.json'
import DeFiat_Gov from 'contracts/DeFiat_Gov.json'
import DeFiat_Farming from 'contracts/DeFiat_Farming_v15.json'
import { 
  setWeb3State, 
  setContractState, 
  setAccountsState, 
  setNetworkState
 } from 'store/action'
import { NoWallet } from './components/NoWallet'
import { Wallet } from './components/Wallet'
import { Staking } from '../Staking'
import { Proposals } from '../Proposals'
import { ProposalInterface } from '../Proposals/ProposalInterface'
import { Operator } from '../Operator'
import { Partners } from '../Partners'
import { SecondChance } from '../SecondChance'
import { AnyStake } from '../AnyStake'
import { withRouter, useRouteMatch, useHistory, Route, Switch } from 'react-router-dom'
import { Nav, NavItem, NavLink, Container } from 'reactstrap'
import { PageWrapper } from 'components/PageWrapper'
import { Loading } from 'components/Loading'


const Dashboard = (props) => {
  const {
    web3,
    setWeb3,
    accounts,
    setAccount,
    contracts,
    setContractInstance,
    network,
    setNetwork
  } = props;

  const [showDashboard, setShowDashboard] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { path } = useRouteMatch();
  const history = useHistory();
  // const w3 = useWeb3();

  useEffect(() => {
    async function loadWeb3() {
      try {
        // Get network provider and web3 instance.
        const w3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accts = await w3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await w3.eth.net.getId();
        const ntk = constants.networks[networkId];

        const smartContracts = {
          token: new w3.eth.Contract(DeFiat_Token.abi, ntk["token"]),
          points: new w3.eth.Contract(DeFiat_Points.abi, ntk["points"]),
          gov: new w3.eth.Contract(DeFiat_Gov.abi, ntk["gov"]),
          farming: new w3.eth.Contract(DeFiat_Farming.abi, ntk["farming"])
        }
        // Set web3, accounts, and contract to the state.
        setWeb3({ web3: w3 });
        setAccount({ accounts: accts });
        setContractInstance({ contracts: smartContracts });
        setNetwork({ network: ntk });
        //setLoading(false);
        setShowDashboard(true);
        // history.push(`${url}/account`)
      } catch (error) {
        // Catch any errors for any of the above operations.
        console.error(error);
        
      } finally {
        setLoading(false);
      }
    }
    if (accounts && accounts.length && contracts && network) {
      setLoading(false);
      setShowDashboard(true);
    } else {
      loadWeb3();
    }
  }, [])

  const handleTab = (tabId) => {
    history.push(tabId);
  }

  return (
    <PageWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!showDashboard ? (
            <div className="content-center">
              <NoWallet />
            </div>
          ) : (
            <Container>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={history.location.pathname === path ? 'active' : '' }
                    onClick={() => handleTab(`${path}`)}
                    style={{cursor:"pointer"}}
                  >
                    Wallet
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={history.location.pathname.includes(path + '/staking') ? 'active' : '' }
                    onClick={() => handleTab(`${path}/staking`)}
                    style={{cursor:"pointer"}}
                  >
                    Staking
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={history.location.pathname.includes(path + '/proposals') ? 'active' : '' }
                    onClick={() => handleTab(`${path}/proposals`)}
                    style={{cursor:"pointer"}}
                  >
                    Proposals
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={history.location.pathname.includes(path + '/partners') ? 'active' : '' }
                    onClick={() => handleTab(`${path}/partners`)}
                    style={{cursor:"pointer"}}
                  >
                    Partners
                  </NavLink>
                </NavItem>
                {network && network.name === 'rinkeby' && (
                  <NavItem>
                    <NavLink
                      className={history.location.pathname.includes(path + '/secondchance') ? 'active' : ''}
                      onClick={() => handleTab(`${path}/secondchance`)}
                      style={{ cursor: "pointer" }}
                    >
                      Second Chance
                    </NavLink>
                  </NavItem>
                                      )}
                                          <NavItem>
                                              <NavLink
                                                  className={history.location.pathname.includes(path + '/anystake') ? 'active' : ''}
                                                  onClick={() => handleTab(`${path}/anystake`)}
                                                  style={{ cursor: "pointer" }}
                                              >
                                                  AnyStake
                    </NavLink>
                                          </NavItem>
              </Nav>
              
              <Switch>
                <Route path={path} exact>
                  <Wallet
                    web3={web3}
                    contracts={contracts} 
                    accounts={accounts}
                    network={network} 
                  />
                </Route>
                <Route path={`${path}/operator`}>
                  <Operator
                    web3={web3}
                    accounts={accounts}
                    network={network} 
                  />
                </Route>
                <Route path={`${path}/staking`}>
                  <Staking
                    web3={web3}
                    accounts={accounts}
                    network={network} 
                  />
                </Route>
                <Route path={`${path}/proposals`}>
                  <Proposals
                    web3={web3}
                    accounts={accounts}
                    network={network} 
                  />
                </Route>
                <Route path={`${path}/partners`}>
                  <Partners
                    web3={web3}
                    accounts={accounts}
                    network={network} 
                  />
                </Route>
                {network && network.name === 'rinkeby' && (
                  <Route path={`${path}/secondchance`}>
                    <SecondChance
                      web3={web3}
                      accounts={accounts}
                      network={network}
                    />
                  </Route>
                                      )}
                                          <Route path={`${path}/anystake`}>
                                              <AnyStake
                                                  web3={web3}
                                                  accounts={accounts}
                                                  network={network}
                                              />
                                          </Route>
              </Switch>
            </Container>
          )}
        </>
      )}
    </PageWrapper>
  )
}

Dashboard.propTypes = {
  setWeb3: PropTypes.func.isRequired,
  setAccount: PropTypes.func.isRequired,
  setContractInstance: PropTypes.func.isRequired,
  setNetwork: PropTypes.func.isRequired,
};

//May not need state
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // connectMetamaskWallet: (payload) => {
    //   dispatch(connectWallet(payload));
    // },
    setWeb3: (payload) => {
      dispatch(setWeb3State(payload));
    },
    setAccount: (payload) => {
      dispatch(setAccountsState(payload));
    },
    setContractInstance: (payload) => {
      dispatch(setContractState(payload));
    },
    setNetwork: (payload) => {
      dispatch(setNetworkState(payload));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
