import React, { useState } from 'react'
import PropTypes from 'prop-types';
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
import {
  Wallet
} from './Wallet'

export function Dashboard(props){
  const { web3, accounts } = props;

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
                    <div className="d-flex justify-space-between">
                      <Card className="mr-4">
                        <CardHeader>
                          <CardTitle className="font-weight-bold h3">10K DFT</CardTitle>
                        </CardHeader>
                        <CardBody>
                          Available Balance
                        </CardBody>
                      </Card>
                      <Card className="mr-4">
                        <CardHeader>
                          <CardTitle className="font-weight-bold h3">10K DFT</CardTitle>
                        </CardHeader>
                        <CardBody>
                          Staked Balance
                        </CardBody>
                      </Card>
                      <Card className="mr-4"> 
                        <CardHeader>
                          <CardTitle className="font-weight-bold h3">2.0%</CardTitle>
                        </CardHeader>
                        <CardBody>
                          Discount Rate
                        </CardBody>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="font-weight-bold h3">1.2K</CardTitle>
                        </CardHeader>
                        <CardBody>
                          Loyalty Points
                        </CardBody>
                      </Card>
                    </div>
                      <Card className="d-flex justify-content-start">
                        <CardBody>
                          {activeTab === 1 && <Wallet />}
                          {activeTab === 2 && <></> }
                          {activeTab === 3 && <></>}
                        </CardBody>
                      </Card>
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

Dashboard.propTypes = {
  web3: PropTypes.object,
};

Dashboard.defaultProps = {
  web3: null,
};

export default Dashboard;