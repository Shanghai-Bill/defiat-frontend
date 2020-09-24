import React, { useEffect, useState } from 'react'
import constants from 'constants'
import { useHistory } from 'react-router-dom';
import Vote from 'contracts/VoteBase.json'
import { Badge, Button, Card, CardBody, Col, Row } from 'reactstrap';

export const ProposalCard = ({
  web3,
  network,
  accounts,
  ...proposal
}) => {
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
    console.log(proposalContract)

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

  return (
    <>
      <Card className="shadow">
        <CardBody>
          <Row className="justify-content-between align-items-center text-left mx-0">
            <div className="d-flex align-items-center">
              <h2 className="mb-1">Proposal Name</h2>
              {proposalState.voteActive ?  (
                <Badge className="ml-2" color="success">Active</Badge>
              ) : (
                <Badge className="ml-2" color="primary">Closed</Badge>
              )}
              
            </div>
            <Button
              className="mb-0" 
              color="info"
              onClick={() => history.push(`/dashboard/proposals/${proposal.proposalAddress}`)}
            >
              View Proposal
            </Button>
          </Row>

          <hr className="w-100 line-primary" />

          <Row className="justify-content-between align-items-center mx-0">
            <Col className="text-left px-0">
              {/* <Row> */}
                <p className="mx-0"><b>Total Votes:</b> {proposalState.totalVotes}</p>
                <p className="mx-0"><b>Owner:</b> {proposalState.owner}</p>
                
              {/* </Row> */}
            </Col>
            <Col  className="text-right px-0">
              <p className="ml-0"><b>Vote Opens:</b> {proposalState.voteStart.toLocaleString()}</p>
              <p className="ml-0"><b>Vote Closes:</b> {proposalState.voteEnd.toLocaleString()}</p>
            </Col>
            
          </Row>
        </CardBody>
      </Card>
    </>
  )
}