import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import FeeBurnRateVote from 'contracts/FeeBurnRateVote.json';
import IERC20 from 'contracts/_ERC20.json';
import { Card, CardBody, Button, Row, Badge, Progress, Col } from 'reactstrap';
import { ProposalOne } from './Components/ProposalOne';

export const ProposalInterface = ({
  web3,
  network,
  accounts
}) => {
  const { proposalId } = useParams();
  let contractAbi = {};
  const proposalContent = network.proposals.filter((x) => x.proposalAddress === proposalId)[0];

  const [proposalState, setProposalState] = useState({
    owner: '',
    voteResults: [],
    maxVote: -1, // record the idnex with most votes
    hasVoted: false,
    voteActive: true,
    voteStart: 0,
    voteEnd: 0,
    totalVotes: 0,
    votingPower: 0,
    rewardSymbol: '',
    rewardAmount: 0,
    rewardDecimals: 18
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
    const { tag } = proposalContent;
    if (tag == "DFTG-1") {
      contractAbi = FeeBurnRateVote.abi;
    }
    
  }

  const getProposal = () => {
    const { tag } = proposalContent;
    if (tag == "DFTG-1") {
      return <ProposalOne />;
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
      contract.methods.rewardToken().call(),
      contract.methods.rewardAmount().call(),
      contract.methods.myVotingPower(accounts[0]).call(),
    ]);
    const voteStart = new Date(values[0] * 1000);
    const voteEnd = new Date(values[1] * 1000);
    const totalVotes = values[2];
    const owner = values[3];
    const rewardToken = values[4];
    const rewardAmount = values[5];
    const votingPower = (values[6] / 1e18).toFixed(0);

    const rewardContract = new web3.eth.Contract(IERC20.abi, rewardToken);
    const tokenResult = await Promise.all([
      rewardContract.methods.symbol().call(),
      rewardContract.methods.decimals().call(),
    ])
    const rewardSymbol = tokenResult[0];
    const rewardDecimals = tokenResult[1];

    const voteResults = await Promise.all(
      proposalContent.choices.map((choice) => contract.methods.voteChoices(choice.value).call())
    );
    let maxPtr = -1;
    voteResults.forEach(result => {
      if (result > maxPtr && result !== 0) {
        maxPtr = result;
      }
    })
    
    console.log(voteResults)
    
    setProposalState({
      ...proposalState,
      voteActive: new Date() > voteStart && new Date() < voteEnd,
      voteStart,
      voteEnd,
      owner,
      totalVotes,
      voteResults,
      rewardAmount,
      rewardSymbol,
      rewardDecimals,
      votingPower
    });
  }

  const submitVote = (choice) => {
    const contract = new web3.eth.Contract(contractAbi, proposalId);
    contract.methods.vote(choice).send({from: accounts[0]})
    .then(() => {
      
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
              <div className="d-flex align-items-center">
                {proposalState.voteActive ?  (
                  <Badge  color="success">Active</Badge>
                ) : (
                  <Badge  color="primary">Closed</Badge>
                )}
                <h3 className="my-0 ml-2"><b>{proposalContent.tag}:</b> {proposalContent.proposalName}</h3>
              </div>
              {
                getProposal()
              }
              <hr className="line-info w-100" />
              <Row className="mx-0 my-2 justify-content-between">
                <h3 className="mb-0">My Voting Power:</h3>
                <h3 className="mb-0">{proposalState.votingPower}</h3>
              </Row>
              <Col className="px-0">
                {proposalContent.choices.map((choice, i) => (
                  <Button
                    key={i}
                    className="w-100 mx-0" 
                    color="info"
                    onClick={() => submitVote(choice.value)}
                  >
                    {choice.name}
                  </Button>
                ))}
              </Col>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody className="text-left">
              <h3>Proposal Info</h3>
              <Row className="justify-content-between mx-0">
                <p><b>Owner:</b></p>
                <p>
                  {toShortAddress(proposalState.owner)}&nbsp;
                  <a href={`https://etherscan.io/address/${proposalState.owner}`}>
                    <i className="tim-icons icon-link-72" />
                  </a>
                </p>
              </Row>
              <Row className="justify-content-between mx-0">
                <p><b>Vote Opens:</b></p>
                <p>{proposalState.voteStart.toLocaleString()}</p>
              </Row>
              <Row className="justify-content-between mx-0">
                <p><b>Vote Closes:</b></p> 
                <p>{proposalState.voteEnd.toLocaleString()}</p>
              </Row>
              <Row className="justify-content-between mx-0">
                <p><b>Vote Reward:</b></p> 
                <p>{(proposalState.rewardAmount / (10**proposalState.rewardDecimals)).toFixed(0)} {proposalState.rewardSymbol}</p>
              </Row>
              <Row className="justify-content-between mx-0">
                <p><b>Total Votes:</b></p>
                <p>{proposalState.totalVotes}</p>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-left">
              <h3>Current Results</h3>
              {proposalContent.choices.map((choice, i) => (
                <div 
                  key={i}
                  className={`progress-container ${proposalState.maxVote === choice.value ? "progress-success" : "progress-primary"}`}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="progress-badge">{choice.name}</span>
                    <span className="progress-badge">{(+proposalState.voteResults[choice.value] / proposalState.totalVotes || 0).toFixed(0)}%</span>
                  </div>
                  <Progress max="100" value={(+proposalState.voteResults[choice.value] / proposalState.totalVotes || 0).toFixed(0)} barClassName={proposalState.maxVote === choice.value ? "progress-bar-success" : "progress-bar-primary"} />
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}
