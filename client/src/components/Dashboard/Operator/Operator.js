import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DeFiat_Farming from 'contracts/DeFiat_Farming_v15.json'
import DeFiat_FarmingExt from 'contracts/DeFiat_EXTFarming_V2.json'
import IERC20 from 'contracts/_ERC20.json'
import { Row, Col, Card, CardBody, FormGroup, FormText, Button, Label, Input } from 'reactstrap'
import { TooltipMessage } from 'components/TooltipMessage'
import { toast } from 'react-toastify';

export const Operator = ({
  web3,
  accounts,
  isExtendedPool
}) => {
  const { contractId } = useParams();
  const contractAbi = isExtendedPool ? DeFiat_FarmingExt.abi : DeFiat_Farming.abi;

  const [isLoading, setLoading] = useState(true);
  const [operatorState, setOperatorState] = useState({
    poolOperator: "",
    poolMetrics: {},
    stakedDecimals: 18,
    rewardDecimals: 18,
    showApproveButton: true,
    stakedSymbol: '',
    rewardSymbol: ''
  });

  const [inputState, setInputState] = useState({
    rewardInput: '',
    preStakeInput: '',
    feeInput: '',
    operatorInput: ''
  })

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
    const contract = new web3.eth.Contract(contractAbi, contractId);
    const values = await Promise.all([
      contract.methods.poolOperator().call(),
      contract.methods.poolMetrics().call(),
    ])
    const poolOperator = values[0];
    const poolMetrics = values[1];

    const { rewardToken, stakedToken } = poolMetrics;
    const rewardContract = new web3.eth.Contract(IERC20.abi, rewardToken);
    const stakedContract = new web3.eth.Contract(IERC20.abi, stakedToken);
    const tokenValues = await Promise.all([
      rewardContract.methods.decimals().call(),
      stakedContract.methods.decimals().call(),
      rewardContract.methods.allowance(accounts[0], contractId).call(),
      stakedContract.methods.allowance(accounts[0], contractId).call(),
      rewardContract.methods.symbol().call(),
      stakedContract.methods.symbol().call(),
    ]);
    const rewardDecimals = tokenValues[0];
    const stakedDecimals = tokenValues[1];
    const showApproveButton = tokenValues[2] <= 0 && tokenValues[3] <= 0;
    const stakedSymbol = tokenValues[4];
    const rewardSymbol = tokenValues[5];

    setOperatorState({
      poolOperator,
      poolMetrics,
      rewardDecimals,
      stakedDecimals,
      showApproveButton,
      stakedSymbol,
      rewardSymbol,
    })

    isLoading && setLoading(false);
  }

  const approveRewards = async () => {
    const contract = new web3.eth.Contract(IERC20.abi, operatorState.poolMetrics.rewardToken);
    const maxApproval = await contract.methods.totalSupply().call();
    contract.methods.approve(contractId, maxApproval).send({from: accounts[0]})
    .then((data) => {
      toast.success(<TooltipMessage title='✅ Success' message={`Successfully approved ${operatorState.rewardSymbol} spending.`} txn={data.transactionHash} />);
      //setOperatorState({...operatorState, showApproveButton: true});
    })
  }

  const approveStaked = async () => {
    const contract = new web3.eth.Contract(IERC20.abi, operatorState.poolMetrics.stakedToken);
    const maxApproval = await contract.methods.totalSupply().call();
    contract.methods.approve(contractId, maxApproval).send({from: accounts[0]})
    .then((data) => {
      toast.success(<TooltipMessage title='✅ Success' message={`Successfully approved ${operatorState.stakedSymbol} spending.`} txn={data.transactionHash} />);
      //setOperatorState({...operatorState, showApproveButton: true});
    })
  }

  const loadRewards = async () => {
    const rewardAmount = inputState.rewardInput 

    const contract = new web3.eth.Contract(contractAbi, contractId);
    contract.methods.loadRewards().send({from: accounts[0]})
    .then(() => {

    })
  }

  const setFee = async () => {
    const contract = new web3.eth.Contract(contractAbi, contractId);
    contract.methods.setFee().send({from: accounts[0]})
    .then(() => {

    })
  }

  const setOperator = async () => {
    const contract = new web3.eth.Contract(contractAbi, contractId);
    contract.methods.setOperator().send({from: accounts[0]})
    .then(() => {

    })
  }

  return (
    <>
      {(!isLoading && (accounts[0] === operatorState.poolOperator || window.location.href.indexOf("localhost") > -1)) ? (
        <Card>
          <CardBody className="text-left">
            <h3 className="mb-1">Operator Dashboard</h3>
            <p className="mb-4"><b>Contract Address:</b> {contractId}</p>
            <h4 className="mb-1">Pool Metrics</h4>
            <Row>
              <Col>
                <DisplayRow
                  title="Staked Symbol:"
                  value={operatorState.stakedSymbol}
                />
                <DisplayRow
                  title="Total Staked:"
                  value={(operatorState.poolMetrics.staked / 10**operatorState.stakedDecimals).toFixed(4)}
                />
                <DisplayRow
                  title="Pool Closes:"
                  value={new Date(operatorState.poolMetrics.closingTime * 1000).toLocaleString()}
                />
                <DisplayRow
                  title="Pool Fee:"
                  value={`${operatorState.poolMetrics.stakingFee / 10}%`}
                />
              </Col>
              <Col>
                <DisplayRow
                  title="Reward Symbol:"
                  value={operatorState.rewardSymbol}
                />
                <DisplayRow
                  title="Total Rewards:"
                  value={(operatorState.poolMetrics.rewards / 10**operatorState.rewardDecimals).toFixed(4)}
                />
                <DisplayRow
                  title="Pool Opens:"
                  value={new Date(operatorState.poolMetrics.startTime * 1000).toLocaleString()}
                />
              </Col>
            </Row>

            <h4 className="mt-4 mb-1">Pool Functions</h4>
            <FormGroup>
              <Label for="loadRewards">Load Rewards</Label>
              <Input
                type="number"
                name="loadRewards"
                id="loadRewards"
                placeholder="Enter Rewards Amount"
                value={inputState.rewardInput}
                onChange={(e) => setInputState({...inputState, rewardInput: e.target.value})}
              />
              <Input
                type="number"
                name="preStake"
                id="preStake"
                placeholder="Enter Pre-Stake Amount"
                className="mt-1"
                value={inputState.preStakeInput}
                onChange={(e) => setInputState({...inputState, preStakeInput: e.target.value})}
              />
              <Row>
                <Col>
                  {operatorState.showApproveButton ? (
                    <>
                      {operatorState.poolMetrics.stakedToken === operatorState.poolMetrics.rewardToken ? (
                        <Button 
                          className="w-100" 
                          color="info"
                          onClick={approveRewards}  
                        >
                          Approve Spend
                        </Button>
                      ) : (
                        <Row>
                          <Col>
                            <Button 
                              className="w-100" 
                              color="info"
                              onClick={approveRewards}  
                            >
                              Approve Spend {}
                            </Button>
                          </Col>
                          <Col>
                            <Button 
                              className="w-100" 
                              color="info"
                              onClick={approveStaked}  
                            >
                              Approve Spend {}
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </>
                  ) : (
                    <Button 
                      className="w-100" 
                      color="info"
                      onClick={loadRewards}
                    >
                      Load Rewards
                    </Button>
                  )}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label for="setOperator">Set Pool Fee</Label>
              <Row>
                <Col>
                  <Input
                    type="number"
                    name="setOperator"
                    id="setOperator"
                    placeholder="Enter Pool Fee Percentage"
                    value={inputState.feeInput}
                    onChange={(e) => setInputState({...inputState, feeInput: e.target.value})}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button className="w-100" color="info">
                    Set Fee
                  </Button>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label for="setOperator">Set Operator Address</Label>
              <Row>
                <Col>
                  <Input
                    type="text"
                    name="setOperator"
                    id="setOperator"
                    placeholder="Enter Address"
                    value={inputState.operatorInput}
                    onChange={(e) => setInputState({...inputState, operatorInput: e.target.value})}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button className="w-100" color="info">
                    Set Operator
                  </Button>
                </Col>
              </Row>
              
              <FormText color="muted">
                This option transfers pool ownership to another address. You will not be able to access this page after performing this operation
              </FormText>
            </FormGroup>
          </CardBody>
        </Card>
      ) : (
        <>
          <Row className="justify-content-center">
            <Col md="3">
            <div className="d-inline-flex align-items-center justify-space-around">
              <img className="mr-2" style={{ height: "50px", width: "50px", marginTop: "0"}} src={require('assets/img/defiat.png')} alt="logo" />
              <h1 className="title m-0">DeFiat</h1>
            </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg="6">
              <h3>
                The operator dashboard only available to the pool owner.
              </h3>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

const DisplayRow = ({
  title,
  value
}) => {
  return (
    <Row>
      <Col className="text-left">{title}</Col>
      <Col className="text-right"><b>{value}</b></Col>
    </Row>
  )
}