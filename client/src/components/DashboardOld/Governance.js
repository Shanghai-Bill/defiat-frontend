import React, { useState, useEffect } from 'react';
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

export const Governance = ({
  contract,
  accounts
}) => {
  // const [activeTab, setActiveTab] = useState(1);

  const [governanceState, setGovernanceState] = useState({
    loyaltyPoints: 0,
    currentLevel: 0,
    discountRate: 0,
    loyaltyPointsNeeded: 0
  })

  useEffect(() => {
    async function getGovernanceData() {
      if (contract) {
        const discountRate = await contract.methods.currentDiscountOf(accounts[0]).call()
        const loyaltyPoints = await contract.methods.showLoyaltyPointsOf(accounts[0]).call();
        const currentLevel = await contract.methods.showLevelOf(accounts[0]).call();
        const nextLevelPoints = await contract.methods.discountTrancheLoyaltyNeeded(currentLevel+1).call();
        const loyaltyPointsNeeded = nextLevelPoints - loyaltyPoints;

        setGovernanceState({
          ...governanceState,
          loyaltyPoints,
          currentLevel,
          discountRate,
          loyaltyPointsNeeded
        })
      }
    }
    getGovernanceData()
  })

  const updateDiscount = async () => {
    if (contract) {
      try {
        console.log(governanceState)
        const transaction = await contract.methods.updatemyDiscount(accounts[0], governanceState.currentLevel).send({from: accounts[0]})
      } catch (err) {
        console.log(err)
      }
      
    }
  }

  return (
    <>
      <Card>
        {/* <CardHeader>
          <Nav className="nav-tabs-info" role="tablist" tabs>
            <NavItem>
              <NavLink
                className={activeTab === 1 ? "active" : ""}
                onClick={() => setActiveTab(1)}
              >
                <i className="tim-icons icon-single-02" />
                User
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 2 ? "active" : ""}
                onClick={() => setActiveTab(2)}
              >
                <i className="tim-icons icon-vector" />
                Governor
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 3 ? "active" : ""}
                onClick={() => setActiveTab(3)}
              >
                <i className="tim-icons icon-link-72" />
                Partner
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 4 ? "active" : ""}
                onClick={() => setActiveTab(4)}
              >
                <i className="tim-icons icon-key-25" />
                Mastermind
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader> */}
        <CardBody>
          <TabContent
            //className="tab-space"
            activeTab={"link1"}
          >
            <TabPane tabId="link1">
              <p className="h2">Current Discount Level: {governanceState.discountRate}</p>
              <p className="h3">Points remaining for next Discount Level: {governanceState.loyaltyPointsNeeded}</p>
              <Button
                onClick={() => updateDiscount()}
              >
                Update My Discount
              </Button>
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