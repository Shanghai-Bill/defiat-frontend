import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col
} from 'reactstrap';

export const Staking = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <Card>
        <CardHeader>
          <Nav className="nav-tabs-info" role="tablist" tabs>
            <NavItem>
              <NavLink
                className={activeTab === 1 ? "active" : ""}
                onClick={() => setActiveTab(1)}
              >
                <i className="tim-icons icon-chart-bar-32" />
                Stats
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 2 ? "active" : ""}
                onClick={() => setActiveTab(2)}
              >
                <i className="tim-icons icon-cloud-upload-94" />
                Deposit
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 3 ? "active" : ""}
                onClick={() => setActiveTab(3)}
              >
                <i className="tim-icons icon-cloud-download-93" />
                Withdraw
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody>
          <TabContent
            className="tab-space"
            activeTab={"link" + activeTab}
          >
            <TabPane tabId="link1">
              <Row>
                <Col>
                  <blockquote className="blockquote blockquote-info">
                    200% <br />
                    APY
                  </blockquote>
                </Col>
                <Col>
                  <blockquote className="blockquote blockquote-info">
                    1.2 DFT<br />
                    Total Rewards Earned
                  </blockquote>
                </Col>
              </Row>
              <Row>
                <Col>
                  <blockquote className="blockquote blockquote-info">
                    1.2M<br />
                    Total Staked DFT
                  </blockquote>
                </Col>
                <Col>
                  <blockquote className="blockquote blockquote-info">
                    $2.3M<br />
                    Total Staked USD
                  </blockquote>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="link2">
              <FormGroup className="d-flex flex-column align-flex-start text-left">
                <Label for="availableDFT">Available DFT: <span className="font-weight-bold">10K DFT</span></Label>
                <Input type="textarea" name="text" id="availableDFT" placeholder="Enter amount of DFT to stake" />
                <Button>
                  Stake DFT
                </Button>
              </FormGroup>
            </TabPane>
            <TabPane tabId="link3">
              <FormGroup className="d-flex flex-column align-flex-start text-left">
                <Label for="availableRewards">Available Rewards: <span className="font-weight-bold">2.5 DFT</span></Label>
                <Input type="textarea" name="text" id="availableRewards" placeholder="Enter amount of DFT to withdraw" />
                <Button>
                  Withdraw Stake
                </Button>
              </FormGroup>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </>
  )
}