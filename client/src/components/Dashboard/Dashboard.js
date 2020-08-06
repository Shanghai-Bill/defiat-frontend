import React, { useState } from 'react'
// import PropTypes from 'prop-types';
import {
  Container,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from 'reactstrap'
import {
  FaWallet,
  FaBalanceScale,
  FaChartLine
} from 'react-icons/fa'
import { Wallet } from './Wallet'
import { Governance } from './Governance'
import { Staking } from './Staking'

export function Dashboard(props){
  // const { web3, accounts } = props;

  const [activeTab, setActiveTab] = useState(1);


  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png")}
          />
          
          <div className="content">
            <Container>
              <Row className="row-grid justify-space-around">
                <Col lg="2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-weight-bold">
                        Dashboard
                      </CardTitle>
                    </CardHeader>
                    
                    <CardBody>
                      <Nav
                        className="nav-pills-info nav-pills-icons flex-column"
                        pills
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            className={activeTab === 1 ? "active" : ""}
                            onClick={() => setActiveTab(1)}
                          >
                            <FaWallet /><br />
                            Wallet
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === 2 ? "active" : ""}
                            onClick={() => setActiveTab(2)}
                          >
                            <FaBalanceScale /><br />
                            Governance
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === 3 ? "active" : ""}
                            onClick={() => setActiveTab(3)}
                          >
                            <FaChartLine /><br />
                            Staking
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="10">
                  <Container>
                    {activeTab === 1 && <Wallet />}
                    {activeTab === 2 && <Governance /> }
                    {activeTab === 3 && <Staking />}
                  </Container>
                </Col>
                </Row>
              </Container>
            </div>
        </div>
      </div>
    </>
  )
}

// Dashboard.propTypes = {
//   web3: PropTypes.object,
// };

// Dashboard.defaultProps = {
//   web3: null,
// };

export default Dashboard;