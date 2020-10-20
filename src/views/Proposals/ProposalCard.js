import React, { useEffect, useState } from 'react'
import constants from 'constants'
import { useHistory } from 'react-router-dom';
import Vote from 'contracts/_Vote.json'
import { Badge, Button, Card, CardBody, Col, Row } from 'reactstrap';

export const ProposalCard = ({
  web3,
  network,
  accounts,
  ...proposal
}) => {
  const now = new Date();
  const history = useHistory();
  const [proposalState, setProposalState] = useState({
    voteStart: 0,
    voteEnd: 0,
    totalVotes: 0,
    voteActive: false,
    owner: ''
  });

  useEffect(() => {
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

  const loadData = async () => {
    const proposalContract = new web3.eth.Contract(Vote.abi, proposal.proposalAddress);

    const values = await Promise.all([
      proposalContract.methods.voteStart().call(),
      proposalContract.methods.voteEnd().call(),
      proposalContract.methods.totalVotes().call(),
      proposalContract.methods.owner().call()
    ])

    const voteStart = new Date(values[0] * 1000);
    const voteEnd = new Date(values[1] * 1000);

    setProposalState({
      ...proposalState,
      voteStart,
      voteEnd,
      voteActive: new Date() > voteStart && new Date() < voteEnd,
      totalVotes: values[2],
      owner: values[3]
    });
  }

  const toShortAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(38);
  }

  return (
    <>
      <Card 
        className="shadow" 
        style={{cursor:"pointer"}} 
        onClick={() => history.push(`/dashboard/proposals/${proposal.proposalAddress}`)}
      >
        <CardBody>
          <Row className="justify-content-between align-items-center text-left mx-0">
            <div className="d-flex align-items-center">
              {proposalState.voteActive ?  (
                <Badge  color="success">Active</Badge>
              ) : (
                <Badge  color="primary">Closed</Badge>
              )}
              <h3 className="my-0 ml-2"><b>{proposal.tag}:</b> <a href="">{proposal.proposalName}</a></h3>
            </div>
            {/* <Button
              className="my-0" 
              color="info"
              onClick={() => history.push(`/dashboard/proposals/${proposal.proposalAddress}`)}
            >
              View Proposal
            </Button> */}
          </Row>

          {/* <hr className="w-100 line-primary" /> */}
          <Row className="justify-content-start mt-2 mx-1">
            <p><b>Total Votes:</b> {(proposalState.totalVotes / 1e18).toFixed(0)}</p>
            <p className="ml-2"><b>Owner:</b> {toShortAddress(proposalState.owner)}</p>
            <p className="ml-2"><b>Vote Opens:</b> {proposalState.voteStart.toLocaleString().split(' ')[0].slice(0, -1)}</p>
            <p className="ml-2"><b>Vote Closes:</b> {proposalState.voteEnd.toLocaleString().split(' ')[0].slice(0, -1)}</p>
          </Row>

          {/* <Row className="justify-content-start mt-4">
            <Col><p><b>Vote Opens:</b> {proposalState.voteStart.toLocaleString().split(' ')[0].slice(0, -1)}</p></Col>
            <Col><p><b>Vote Closes:</b> {proposalState.voteEnd.toLocaleString().split(' ')[0].slice(0, -1)}</p></Col>
            <Col><p><b>Owner:</b> {toShortAddress(proposalState.owner)}</p></Col>
            <Col><p><b>Total Votes:</b> {proposalState.totalVotes}</p></Col>
          </Row> */}
        </CardBody>
      </Card>
    </>
  )
}