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
  Button
} from 'reactstrap';

export const Governance = () => {
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
                <i className="tim-icons icon-spaceship" />
                L0
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 2 ? "active" : ""}
                onClick={() => setActiveTab(2)}
              >
                <i className="tim-icons icon-settings-gear-63" />
                Governor
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 3 ? "active" : ""}
                onClick={() => setActiveTab(3)}
              >
                <i className="tim-icons icon-bag-16" />
                Partner
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 4 ? "active" : ""}
                onClick={() => setActiveTab(4)}
              >
                <i className="tim-icons icon-bag-16" />
                Mastermind
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody>
          <TabContent
            //className="tab-space"
            activeTab={"link" + activeTab}
          >
            <TabPane tabId="link1">
              <p className="h2">Current Discount Level: </p>
              <p className="h3">Points remaining for next Discount Level: </p>
              <Button>Update My Discount</Button>
            </TabPane>
            <TabPane tabId="link2">
              {/* <FormGroup>
                <Label for="availableDFT">Available DFT: <span className="font-weight-bold"></span></Label>
                <Input type="textarea" name="text" id="availableDFT" placeholder="Enter amount of DFT to stake" />
                
              </FormGroup> */}
            </TabPane>
            <TabPane tabId="link3">
              {/* <FormGroup>
                <Label for="availableRewards">Available Rewards: <span className="font-weight-bold">2.5 DFT</span></Label>
                <Input type="textarea" name="text" id="availableRewards" />
              </FormGroup> */}
            </TabPane>
            <TabPane tabId="link4">
              <FormGroup>
                <Label for="burnTokens">Burn Tokens<span className="font-weight-bold"></span></Label>
                <Input type="text" name="text" id="burnTokens" placeholder="Enter amount of tokens to burn" />
              </FormGroup>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </>
  )
}