import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import getWeb3 from '../../getWeb3';
import constants from '../../constants';
import { connect } from 'react-redux';
import DeFiat_Token from 'contracts/DeFiat_Token.json';
import DeFiat_Points from 'contracts/DeFiat_Points.json';
import DeFiat_Gov from 'contracts/DeFiat_Gov.json';
import DeFiat_Farming from 'contracts/DeFiat_Farming.json';
import { 
  setWeb3State, 
  setContractState, 
  setAccountsState, 
  setNetworkState
 } from 'store/action';
import { NoWallet } from './NoWallet';
import { Wallet } from './Wallet';
import { Staking } from './Staking';
import { withRouter, useRouteMatch, useHistory, Route, Switch } from 'react-router-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container, NavbarText } from 'reactstrap';


const Dashboard = (props) => {
  const {
    location,
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
  }, [location])

  const handleTab = (tabId) => {
    history.push(tabId);
  }

  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <div className="content">
            {isLoading ? (
              <div className="content-center">
                <Row className="justify-content-center">
                  <Col lg="3">
                    <img alt="loading" src={require("assets/img/LoadingScales.gif")} />
                  </Col>
                </Row>
              </div>
            ) : (
              <>
                {!showDashboard ? (
                  <div className="content-center">
                    <NoWallet />
                  </div>
                ) : (
                  <>
                    {network.name === 'main' ? (
                      <Wallet
                        web3={web3}
                        contracts={contracts} 
                        accounts={accounts}
                        network={network} 
                      />
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
                          <Route path={`${path}/staking`}>
                            <Staking
                              web3={web3}
                              contracts={contracts} 
                              accounts={accounts}
                              network={network} 
                            />
                          </Route>
                        </Switch>
                      </Container>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
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