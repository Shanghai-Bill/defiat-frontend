import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import FeeBurnRateVote from 'contracts/FeeBurnRateVote.json';
import { Card, CardBody, Button, Row, Badge, Progress, Col } from 'reactstrap';

export const ProposalInterface = ({
  web3,
  network,
  accounts
}) => {
  const { proposalId } = useParams();
  let contractAbi = {}, descNode = null;

  const [proposalState, setProposalState] = useState({
    owner: '',
    voteStart: 0,
    voteEnd: 0,
  });

  useEffect(() => {
    loadProposal();
    loadData();
    const subscription = web3.eth.subscribe('newBlockHeaders', (error, result) => {
      if (!error) {
        loadData();

        return;
      }
  
      console.error(error);
    })

    return () => subscription.unsubscribe();
  }, []);

  const loadProposal = () => {
    // set the proposal specific contract
    // set the description UI component
    if (proposalId === "0x01CE7B613D1bC512Ad38FED6c02D8A8df8AE6ECf") {
      contractAbi = FeeBurnRateVote.abi;
    }
  }

  const loadData = async () => {
    const contract = new web3.eth.Contract(contractAbi, proposalId);
    console.log(contract)
    const values = await Promise.all([
      contract.methods.voteStart().call(),
      contract.methods.voteEnd().call(),
      contract.methods.totalVotes().call(),
      contract.methods.owner().call(),
      contract.methods.voteChoices(0).call(),
      contract.methods.votingTokens(accounts[0]).call()
    ])

    console.log(values)

    const voteStart = new Date(values[0] * 1000);
    const voteEnd = new Date(values[1] * 1000);
    setProposalState({
      voteStart,
      voteEnd,
      owner: values[3]
    })
  }

  const toShortAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(38);
  }

  return (
    <>
      <div className="d-flex justify-content-start mb-2">
        <Link to="/dashboard/proposals">
          <Button
            className="btn-link"
            color="success"
            size="sm"
          >
            <i className="tim-icons icon-minimal-left" />
          </Button>
          <p className="category text-success d-inline">
            Go Back
          </p>
        </Link>
      </div>
      <Row>
        <Col>
          <Card>
            <CardBody className="text-left">
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="mb-0">Change Network Fee and Burn Rates</h2>
                <Badge color="success">Active</Badge>
              </div>
              
              <hr className="line-primary w-100" />
              <p>
                The early days of DeFiat have been winding to a close with the 
                release of staking and now a voting interface.
                After seeing the performance of the token over the first month, 
                the development team would like to propose a vote to change the 
                network fee and burn rates.
              </p>
              <br />
              <p>
                This contract will change the DeFiat network transaction fee and burn rate
                on every transaction to the option with the most votes when the decision is activated.
                Anyone can activate the vote once the voting period has expired.
              </p>
              <br />
              <p>
                Voting Power for this contract is equal to the total DFT value of your staked holdings in the DeFiat
                Dungeon, Liquidity Lab, and Points Palace.
              </p>
              <Row className="mx-0 my-2 justify-content-between">
                <h3 className="mb-0">My Voting Power:</h3>
                <h3 className="mb-0">10,000</h3>
              </Row>
              <Col className="px-0">
                <Button className="w-100" color="info">Decrease to 0%</Button>
                <Button className="w-100 mx-0" color="info">Remain at 0.10%</Button>
                <Button className="w-100 mx-0" color="info">Increase to 0.50%</Button>
              </Col>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody className="text-left">
              <h2>Proposal Info</h2>
              <Row className="justify-content-between mx-0"><b>Owner:</b> {toShortAddress(proposalState.owner)}</Row>
              <Row className="justify-content-between mx-0"><b>Vote Opens:</b> {proposalState.voteStart.toLocaleString()}</Row>
              <Row className="justify-content-between mx-0"><b>Vote Closes:</b> {proposalState.voteEnd.toLocaleString()}</Row>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-left">
              <h2>Current Results</h2>
              <div className="progress-container progress-success">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="progress-badge">Decrease to 0%</span>
                  <span className="progress-badge">60%</span>
                </div>
                <Progress max="100" value="60" barClassName="progress-bar-success" />
              </div>
              <div className="progress-container progress-primary">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="progress-badge">Remain at 0.10%</span>
                  <span className="progress-badge">10%</span>
                </div>
                <Progress max="100" value="10" barClassName="progress-bar-primary" />
              </div>
              <div className="progress-container progress-primary">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="progress-badge">Increase to 0.50%</span>
                  <span className="progress-badge">30%</span>
                </div>
                <Progress max="100" value="30" barClassName="progress-bar-primary" />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}
