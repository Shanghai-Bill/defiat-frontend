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
  const [updatingApproval, setUpdatingApproval] = useState(false);
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
        
        //contracts["farming"].methods.eligibileRewardsOf(accounts[0]).call(),
        //contracts["farming"].methods.
      ])

      console.log(network)

      const userMetrics = values[2];
      const poolMetrics = values[3];

      setStakingState({
        ...stakingState,
        tokenBalance: (values[0] / (10 ** 18)).toFixed(2),
        stakingAllowance: values[1],
        stakedBalance: (userMetrics.stake / (10 ** 18)).toFixed(2),
        availableRewards: userMetrics.rewardAccrued,
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
    const totalSupply = await contracts["token"].methods.totalSupply().call();
    setUpdatingApproval(true);
    contracts["token"].methods.approve(network["farming"], totalSupply).send({from: accounts[0]})
      .then((data) => {
        console.log(data)
        toast.success(`✅ Successfully approved DFT staking.`);
        setShowApproveButton(false);
        setUpdatingApproval(false);
      })
      .catch((err) => {
        console.log(err)
        toast.error("⛔️ Encountered an error, could not approve DFT staking.")
        setUpdatingApproval(false);
      });
  }

  const stakeToken = async () => {
    const stakeAmount = new BigNumber(+stakeAmountInput * (10 ** 18))
    contracts["farming"].methods.stake(stakeAmount).send({from: accounts[0]})
      .then((data) => {
        console.log(data)
        toast.success(`✅ Successfully staked ${stakeAmountInput} DFT.`);
        setStakingState({
          ...stakingState,
          stakedBalance: stakingState.stakedBalance + +stakeAmountInput,
          tokenBalance: stakingState.tokenBalance - +stakeAmountInput
        })
        setStakeAmountInput('')
      })
      .catch((err) => {
        console.log(err)
        toast.error("⛔️ Encountered an error, could not stake tokens.")
        setStakeAmountInput('')
      });
  }

  const unStakeToken = async () => {
    const unstakeAmount = new BigNumber(+unstakeAmountInput * (10 ** 18))
    contracts["farming"].methods.unStake(unstakeAmount).send({from: accounts[0]})
      .then((data) => {
        console.log(data)
        toast.success(`✅ Successfully unstaked ${unstakeAmountInput} DFT.`);
        setStakingState({
          ...stakingState,
          stakedBalance: stakingState.stakedBalance - +unstakeAmountInput,
          tokenBalance: stakingState.tokenBalance + +unstakeAmountInput
        })
        setStakeAmountInput('')
      })
      .catch((err) => {
        console.log(err)
        toast.error("⛔️ Encountered an error, could not unstake tokens.")
        setStakeAmountInput('')
      });
  }

  // take reward
  const takeRewards = () => {
    const { availableRewards } = stakingState;
    contracts["farming"].methods.takeRewards().send({from: accounts[0]})
      .then((data) => {
        console.log(data)
        toast.success(`✅ Successfully claimed ${availableRewards} DFT.`);
        setStakeAmountInput('')
        setStakingState({
          ...stakingState,
          availableRewards: 0,
          tokenBalance: stakingState.tokenBalance + availableRewards
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error("⛔️ Encountered an error, could not unstake tokens.")
        setStakeAmountInput('')
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
                      className="w-100" 
                      color="info"
                      onClick={() => takeRewards()}
                    >
                      Claim Rewards
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
                      >
                        Approve DFT
                      </Button>
                    ) : (
                      <Button 
                        className={`w-100 ${shouldDisableButton(stakeAmountInput, stakingState.tokenBalance) ? "disabled" : ""}`}
                        color="info"
                        onClick={() => stakeToken()}
                      >
                        Stake DFT
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
                      className={`w-100 ${shouldDisableButton(unstakeAmountInput, stakingState.stakedBalance) ? "disabled" : ""}`}
                      color="info"
                      onClick={() => unStakeToken()}
                    >
                      Unstake DFT
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