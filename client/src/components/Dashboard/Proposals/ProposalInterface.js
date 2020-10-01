import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import FeeBurnRateVote from 'contracts/FeeBurnRateVote.json';
import PointsThresholdVote from 'contracts/PointsThresholdVote.json'
import IERC20 from 'contracts/_ERC20.json';
import { Card, CardBody, Button, Row, Badge, Progress, Col } from 'reactstrap';
import { ProposalOne } from './Components/ProposalOne';
import { ProposalTwo } from './Components/ProposalTwo';
import { TooltipMessage } from 'components/TooltipMessage'
import { toast } from 'react-toastify';

export const ProposalInterface = ({
  web3,
  network,
  accounts
}) => {
  const { proposalId } = useParams();
  const proposalContent = network.proposals.filter((x) => x.proposalAddress === proposalId)[0];
  const [isLoading, setLoading] = useState(true);
  const [proposalState, setProposalState] = useState({
    owner: '',
    voteResults: [],
    maxVote: -1, // record the idnex with most votes
    hasVoted: false,
    myVote: 0,
    voteActive: true,
    voteStart: 0,
    voteEnd: 0,
    totalVotes: 0,
    totalVotesDisplay: 0,
    votingPower: 0,
    rewardSymbol: '',
    rewardAmount: 0,
    rewardDecimals: 18,
    decisionActivated: true
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

  const loadProposal = () => {
    const { tag } = proposalContent;
    switch (tag) {
      case "DFTG-1":
        return FeeBurnRateVote.abi;
      case "DFTG-2":
        return PointsThresholdVote.abi;
      default:
        return {};
    }
  }

  const getProposal = () => {
    const { tag } = proposalContent;
    switch (tag) {
      case "DFTG-1":
        return <ProposalOne />;
      case "DFTG-2":
        return <ProposalTwo />;
      default:
        return <></>;
    }
  }

  const loadData = async () => {
    const contract = new web3.eth.Contract(loadProposal(), proposalId);
    const values = await Promise.all([
      contract.methods.voteStart().call(),
      contract.methods.voteEnd().call(),
      contract.methods.totalVotes().call(),
      contract.methods.owner().call(),
      contract.methods.rewardToken().call(),
      contract.methods.rewardAmount().call(),
      contract.methods.myVotingPower(accounts[0]).call(),
      contract.methods.votes(accounts[0]).call(),
      contract.methods.decisionActivated().call(),
    ]);
    const voteStart = new Date(values[0] * 1000);
    const voteEnd = new Date(values[1] * 1000);
    const totalVotes = values[2]; 
    const totalVotesDisplay = (values[2] / 1e18).toFixed(0);
    const owner = values[3];
    const rewardToken = values[4];
    const rewardAmount = values[5];
    const votingPower = (values[6] / 1e18).toFixed(0);
    const hasVoted = values[7].timestamp > 0;
    const myVote = +values[7].voteChoice;
    const decisionActivated = values[8];

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
    let maxVote = 0, maxVoteAmt = 0;
    voteResults.forEach((result, i) => {
      if (result > maxVoteAmt) {
        maxVoteAmt = result;
        maxVote = i;
      }
    });
    
    setProposalState({
      ...proposalState,
      voteActive: new Date() > voteStart && new Date() < voteEnd,
      voteStart,
      voteEnd,
      owner,
      totalVotes,
      totalVotesDisplay,
      voteResults,
      rewardAmount,
      rewardSymbol,
      rewardDecimals,
      votingPower,
      hasVoted,
      myVote,
      decisionActivated,
      maxVote
    });

    isLoading && setLoading(false);
  }

  const submitVote = (choice) => {
    const contract = new web3.eth.Contract(loadProposal(), proposalId);
    contract.methods.vote(choice.value).send({from: accounts[0]})
    .then((data) => {
      toast.success(
        <TooltipMessage 
          title='✅ Success'
          message={`Successfully voted for ${choice.name}`}
          txn={data.transactionHash} 
        />
      );
    })
    .catch((error) => {
      toast.error(
        <TooltipMessage 
          title="⛔️ Error" 
          message="Could not submit vote." 
        />
      )
    })
  }

  const activateDecision = () => {
    const contract = new web3.eth.Contract(loadProposal(), proposalId);
    contract.methods.activateDecision().send({from: accounts[0]})
    .then((data) => {
      toast.success(
        <TooltipMessage 
          title='✅ Success'
          message={`Successfully activated vote decision.`}
          txn={data.transactionHash} 
        />
      );
    })
    .catch((error) => {
      toast.error(
        <TooltipMessage 
          title="⛔️ Error" 
          message="Could not activate decision." 
        />
      )
    })
  }

  const toShortAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(38);
  }

  return (
    <>
      {isLoading ? (
          <div className="content-center">
            <Row className="justify-content-center">
              <Col lg="3">
                <img alt="loading" src={require("assets/img/Farm-Loading.gif")} />
              </Col>
            </Row>
          </div>
        ) : (
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
                    <hr className="line-info w-100" />
                    {
                      getProposal()
                    }
                    </CardBody>
                </Card>
                    <Card>
                      <CardBody>
                    {/* <Row className="mx-0 my-1 justify-content-between">
                      <h3 className="my-0">My Voting Power:</h3>
                      <h3 className="my-0">{proposalState.votingPower}</h3>
                    </Row> */}
                    <Col className="px-0">
                      {proposalContent.choices.map((choice, i) => (
                        <Button
                          key={i}
                          className="w-100 mx-0" 
                          color="info"
                          onClick={() => submitVote(choice)}
                          disabled={proposalState.hasVoted}
                        >
                          {proposalState.hasVoted && proposalState.myVote == i && (
                            <>
                              <i className="tim-icons icon-check-2 mr-2" />
                            </>
                          )}
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
                    <h3 className="mb-2">Proposal Info</h3>
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
                      <p>{proposalState.totalVotesDisplay}</p>
                    </Row>
                    {proposalState.voteActive && !proposalState.hasVoted && (
                      <Row className="justify-content-between mx-0">
                        <p><b>My Voting Power:</b></p>
                        <p>{proposalState.votingPower}</p>
                      </Row>
                    )}
                  </CardBody>
                </Card>
                <Card>
                  <CardBody className="text-left">
                    <h3 className="mb-2">Current Results</h3>
                    {proposalContent.choices.map((choice, i) => (
                      <div 
                        key={i}
                        className={`progress-container ${proposalState.maxVote === choice.value ? "progress-success" : "progress-primary"}`}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="progress-badge">{choice.name}</span>
                          <span className="progress-badge">{((+proposalState.voteResults[choice.value] / proposalState.totalVotes) * 100 || 0).toFixed(0)}%</span>
                        </div>
                        <Progress max="100" value={((+proposalState.voteResults[choice.value] / proposalState.totalVotes) * 100 || 0).toFixed(0)} barClassName={proposalState.maxVote === choice.value ? "progress-bar-success" : "progress-bar-primary"} />
                      </div>
                    ))}
                    {new Date() > proposalState.voteEnd && (
                      <>
                        {!proposalState.decisionActivated ? (
                          <Button
                            className="w-100 mx-0" 
                            color="info"
                            onClick={activateDecision}
                          >
                            Activate Decision
                          </Button>
                        ) : (
                          <Button
                            className="w-100 mx-0" 
                            color="info"
                            disabled
                          >
                            Decision has been Activated
                          </Button>
                        )}
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
        )}
    </>
  )
}
