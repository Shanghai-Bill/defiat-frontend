import React, { useEffect, useState } from 'react'
import { 
  Row,
  Col,
  Container,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputGroupAddon,
  Button
} from 'reactstrap'
import { toast } from 'react-toastify'
import BigNumber from "bignumber.js"

export const Staking = ({
  contracts,
  accounts,
  network
}) => {
  const [isLoading, setLoading] = useState(true);
  const [stakeAmountInput, setStakeAmountInput] = useState('');
  const [unstakeAmountInput, setUnstakeAmountInput] = useState('');
  const [showApproveButton, setShowApproveButton] = useState(true);
  const [isApproving, setApproving] = useState(false);
  const [isUnstaking, setUnstaking] = useState(false);
  const [isStaking, setStaking] = useState(false);
  const [isClaiming, setClaiming] = useState(false);

  const [stakingState, setStakingState] = useState({
    tokenBalance: 0,
    stakedBalance: 0,
    stakingAllowance: 0,
    availableRewards: 0,
    totalPoolRewards: 0,
    totalPoolStaked: 0,
    currentPoolFee: 0
  })

  useEffect(() => {
    async function getStakingData() {
      const values = await Promise.all([
        contracts["token"].methods.balanceOf(accounts[0]).call(),
        contracts["token"].methods.allowance(accounts[0], network["farming"]).call(),
        contracts["farming"].methods.userMetrics(accounts[0]).call(),
        contracts["farming"].methods.poolMetrics().call(),
        contracts["farming"].methods.viewEligibleRewardOf(accounts[0]).call()
        //contracts["farming"].methods.eligibileRewardsOf(accounts[0]).call(),
        //contracts["farming"].methods.
      ])

      const userMetrics = values[2];
      const poolMetrics = values[3];

      setStakingState({
        ...stakingState,
        tokenBalance: (values[0] / (10 ** 18)).toFixed(2),
        stakingAllowance: values[1],
        stakedBalance: (userMetrics.stake / (10 ** 18)).toFixed(2),
        availableRewards: (values[4] / (10 ** 18)).toFixed(2),
        totalPoolRewards: (poolMetrics.rewards / (10 ** 18)).toFixed(2),
        totalPoolStaked: ((poolMetrics.staked / (10 ** 18)).toFixed(2)), //- (poolMetrics.rewards / (10 ** 18))),
        currentPoolFee: (poolMetrics.stakingFee / 10)
      })

      console.log(values)
      // if we have already approved staking, show the approve button
      if (values[1] > 0) {
        setShowApproveButton(false);
      }

      setLoading(false);
    }

    getStakingData();
  }, []);

  const approveStaking = async () => {
    setApproving(true);
    const totalSupply = await contracts["token"].methods.totalSupply().call();
    contracts["token"].methods.approve(network["farming"], totalSupply).send({from: accounts[0]})
      .then((data) => {
        toast.success(`✅ Successfully approved DFT staking.`);
      })
      .catch((err) => {
        // console.log(err);
        toast.error("⛔️ Encountered an error, could not approve DFT staking.");
      })
      .finally(() => {
        setApproving(false);
      });
  }

  const stakeToken = async () => {
    setStaking(true);
    const sAmount = parseFloat(stakeAmountInput);
    const stakeAmount = new BigNumber(sAmount).multipliedBy(10 ** 18);
    contracts["farming"].methods.stake(stakeAmount).send({from: accounts[0]})
      .then((data) => {
        toast.success(`✅ Successfully staked ${stakeAmountInput} DFT.`);
        setStakingState({
          ...stakingState,
          stakedBalance: stakingState.stakedBalance + sAmount,
          tokenBalance: stakingState.tokenBalance - sAmount
        })
      })
      .catch((err) => {
        // console.log(err)
        toast.error("⛔️ Encountered an error, could not stake tokens.")
      })
      .finally(() => {
        setStakeAmountInput('');
        setStaking(false);
      });
  }

  const unStakeToken = async () => {
    setUnstaking(true);
    const uAmount = parseFloat(unstakeAmountInput);
    const unstakeAmount = new BigNumber(uAmount).multipliedBy(10 ** 18);
    contracts["farming"].methods.unStake(unstakeAmount).send({from: accounts[0]})
      .then((data) => {
        toast.success(`✅ Successfully unstaked ${unstakeAmountInput} DFT.`);
        setStakingState({
          ...stakingState,
          stakedBalance: stakingState.stakedBalance - uAmount,
          tokenBalance: stakingState.tokenBalance + uAmount
        })
      })
      .catch((err) => {
        // console.log(err);
        toast.error("⛔️ Encountered an error, could not unstake tokens.")
      })
      .finally(() => {
        setUnstaking(false);
        setStakeAmountInput('');
      });
  }

  // take reward
  const takeRewards = () => {
    setClaiming(true);
    const rewards = parseFloat(stakingState.availableRewards);
    contracts["farming"].methods.takeRewards().send({from: accounts[0]})
      .then((data) => {
        toast.success(`✅ Successfully claimed ${rewards} DFT.`);
        const updatedBalance = +stakingState.tokenBalance + +rewards;
        setStakingState({
          ...stakingState,
          availableRewards: 0,
          tokenBalance: updatedBalance
        });
      })
      .catch((err) => {
        // console.log(err)
        toast.error("⛔️ Encountered an error, could not claim rewards.")
      })
      .finally(() => {
        setClaiming(false);
      });
  }

  // take reward and leave the pool
  const exitPool = () => {

  }

  // determine if the initial amount is within bounds
  const shouldDisableButton = (amountInput, maxBound) => {
    if (amountInput === '' || +amountInput === 0 || +amountInput > maxBound) {
      return true;
    }
    return false;
  }


  return (
    <>
      {isLoading ? (
        <div className="content-center">
          <Row className="justify-content-center">
            <Col lg="3">
              <img alt="loading" src={require("assets/img/LoadingScales.gif")} />
            </Col>
          </Row>
        </div>
      ) : (
        <Container>
          <div className="p-2 mb-4">
            <img src={require('assets/img/defiat.png')} width="100" height="auto" alt="defiat" />
          </div>
          
          <h1 className="text-primary mb-2">
            Native DeFiat Staking
          </h1>
          <p className="text-tertiary mb-4">Stake DFT, Receive DFT</p>

          <Row className="justify-content-center">
            <Col lg="5" className="d-flex">
              <Card className="shadow">
                <CardBody className="text-left">
                  <h3 className="text-primary mb-1">Pool Metrics</h3>
                  <p>Pool Liquidity: <b>{stakingState.totalPoolStaked} DFT</b></p>
                  <p>Pool Rewards: <b>{stakingState.totalPoolRewards} DFT</b></p>
                  <p>Pool Fee: <b>{stakingState.currentPoolFee} %</b></p>
                </CardBody>
              </Card>
            </Col>
            <Col lg="5" className="d-flex">
              <Card className="shadow">
                <CardBody className="text-left">
                  <h3 className="text-primary mb-1">Claim Rewards</h3>
                  <p>Rewards Available: <b>{stakingState.availableRewards} DFT</b></p>
                  <div className="d-flex justify-content-center w-100">
                    <Button 
                      className={`w-100`} 
                      color="info"
                      onClick={() => takeRewards()}
                      disabled={isClaiming}
                    >
                      {isClaiming ? "Claiming Rewards..." : "Claim Rewards"}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg="5" className="d-flex">
              <Card className="shadow">
                <CardBody className="text-left">
                  <h3 className="text-primary mb-1">Stake DeFiat</h3>
                  <p>Your Balance: <b>{stakingState.tokenBalance} DFT</b></p>
                  <Input 
                    value={stakeAmountInput}
                    onChange={(e) => setStakeAmountInput(e.target.value)}
                    placeholder="Enter stake amount..." 
                  />
                  
                  <div className="d-flex justify-content-center w-100">
                    {showApproveButton ? (
                      <Button
                        className="w-100"
                        color="info"
                        onClick={() => approveStaking()}
                        disabled={isApproving}
                      >
                        {isApproving ? "Approving..." : "Approve DFT"}
                      </Button>
                    ) : (
                      <Button 
                        className="w-100"
                        color="info"
                        onClick={() => stakeToken()}
                        disabled={isStaking || shouldDisableButton(stakeAmountInput, stakingState.tokenBalance)}
                      >
                        {isStaking ? "Staking..." : "Stake DFT"}
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="5" className="d-flex">
              <Card className="shadow">
                <CardBody className="text-left">
                  <h3 className="text-primary mb-1">Unstake DeFiat</h3>
                  <p>Your Staked Balance: <b>{stakingState.stakedBalance} DFT</b></p>
                  <Input 
                    value={unstakeAmountInput}
                    onChange={(e) => setUnstakeAmountInput(e.target.value)}
                    placeholder="Enter Unstake amount..." 
                  />
                  
                  <div className="d-flex justify-content-center w-100">
                    <Button 
                      className="w-100"
                      color="info"
                      onClick={() => unStakeToken()}
                      disabled={isUnstaking || shouldDisableButton(unstakeAmountInput, stakingState.stakedBalance)}
                    >
                      {isUnstaking ? "Unstaking..." : "Unstake DFT"}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* <Col lg="4" className="d-flex">
              <Card className="shadow">
                <CardBody className="text-left">
                  <h3 className="text-primary mb-1">Claim Rewards</h3>
                  <p>Rewards Available: <b>1 DFT</b></p>
                  <div className="d-flex justify-content-center w-100">
                    <Button 
                      className="w-100" 
                      color="info"
                      onClick={() => unStakeToken()}
                    >
                      Claim Rewards
                    </Button>
                    
                  </div>
                  <div className="d-flex justify-content-center w-100">
                    <Button 
                      className="w-100" 
                      color="info"
                      onClick={() => unStakeToken()}
                    >
                      Claim Rewards
                    </Button>
                    
                  </div>
                  
                  {/* <Input value="" placeholder="Enter Unstake amount..." />
                  
                </CardBody>
              </Card>
            </Col> */}
          </Row>
        </Container>
      )}
    </>
  )
}