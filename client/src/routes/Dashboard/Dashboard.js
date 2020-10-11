import React, { useState } from 'react';
import { NoWallet } from './NoWallet';
import { Overview } from './Overview';
import { Staking } from './Staking';
import { Proposals } from './Proposals';
import { Operator } from './Operator';
import { Partners } from './Partners';
import { withRouter, useRouteMatch, useHistory, Route, Switch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { Nav, NavItem, NavLink, Row, Col, Container } from 'reactstrap';
import DeFiatProvider from 'contexts/DeFiat';

export const Dashboard = withRouter((props) => {

  const [showDashboard, setShowDashboard] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { path } = useRouteMatch();
  const history = useHistory();

  const { account, chainId } = useWallet();

  const handleTab = (tabId) => {
    history.push(tabId);
  }

  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <div className="content">
            {!!account ? (
              <div className="content-center">
                <NoWallet />
              </div>
            ) : ( 
              <DeFiatProvider>
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
                </Nav>
                
                <Switch>
                  <Route component={Overview} path={path} exact />
                  <Route component={Operator} path={`${path}/operator`} />
                  <Route component={Staking} path={`${path}/staking`} />
                  <Route component={Proposals} path={`${path}/proposals`} />
                  <Route component={Partners} path={`${path}/partners`} />
                </Switch>
              </Container>

              </DeFiatProvider>
            )}
              
          </div>
        </div>
      </div>
    </>
  )
});