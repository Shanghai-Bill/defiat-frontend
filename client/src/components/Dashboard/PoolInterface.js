import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip
} from 'reactstrap'
import { TooltipMessage } from 'components/TooltipMessage';
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import IERC20 from 'contracts/_ERC20.json'
import DeFiat_Farming from 'contracts/DeFiat_Farming_v12.json'
import { MdInfoOutline } from 'react-icons/md'

export const PoolInterface = ({
  contracts,
  accounts,
  web3,
  network
}) => {
  const { contractId } = useParams();
  const poolContent = network.pools.filter((x) => x.poolAddress === contractId)[0];

  const [isLoading, setLoading] = useState(true);
  const [blockNumber, setBlockNumber] = useState(0);
  const [lastTransaction, setLastTransaction] = useState(0);

  // Inputs
  const [stakeAmountInput, setStakeAmountInput] = useState('');
  const [showApproveButton, setShowApproveButton] = useState(true);
  const [isApproving, setApproving] = useState(false);
  const [isStaking, setStaking] = useState(false);
  const [isClaiming, setClaiming] = useState(false);
  
  // Modal
  const [isOpen, setOpen] = useState(false);
  const [stakeAction, setStakeAction] = useState('');

  // contract items
  const [farmingContract, setFarmingContract] = useState({});
  const [rewardContract, setRewardContract] = useState({});
  const [tokenContract, setTokenContract] = useState({});
  const [userMetrics, setUserMetrics] = useState({})

  const [stakingState, setStakingState] = useState({
    rewardSymbol: "",
    stakedSymbol: "",
    longTokenBalance: 0,
    tokenBalance: 0,
    stakedBalance: 0,
    stakingAllowance: 0,
    availableRewards: 0,
    totalPoolRewards: 0,
    totalPoolStaked: 0,
    currentPoolFee: 0
  })

  // tooltip
  const [tooltip1Open, setTooltip1Open] = useState(false);
  const [tooltip2Open, setTooltip2Open] = useState(false);

  const toggle1 = () => setTooltip1Open(!tooltip1Open);
  const toggle2 = () => setTooltip2Open(!tooltip2Open);

  useEffect(() => {
    loadData();
    const subscription = web3.eth.subscribe('newBlockHeaders', (error, result) => {
      if (!error) {
        setBlockNumber(result.number);
        loadData();

        return;
      }
  
      console.error(error);
    })

    return () => subscription.unsubscribe();
  }, [])

  const loadData = async () => {
      const farmingContract = farmingContract || new web3.eth.Contract(DeFiat_Farming.abi, contractId);
      const poolMetrics = await farmingContract.methods.poolMetrics().call();
      const tokenContract = tokenContract || new web3.eth.Contract(IERC20.abi, poolMetrics.stakedToken);
      const rewardContract = rewardContract || new web3.eth.Contract(IERC20.abi, poolMetrics.rewardToken);
      isLoading && setFarmingContract(farmingContract);
      isLoading && setTokenContract(tokenContract);
      isLoading && setRewardContract(rewardContract);

    // Implement edge cases for decimal amounts that are different than 18
    // stakedContract.methods.decimals().call(),
    const values = await Promise.all([
      tokenContract.methods.symbol().call(),
      rewardContract.methods.symbol().call(),

      tokenContract.methods.balanceOf(accounts[0]).call(),
      tokenContract.methods.allowance(accounts[0], contractId).call(),


      farmingContract.methods.userMetrics(accounts[0]).call(),
      farmingContract.methods.myRewards(accounts[0]).call(),
      farmingContract.methods.myStake(accounts[0]).call(),
      web3.eth.getBlockNumber()
    ])

    
    const stakingAllowance = values[3];
    const userMetrics = values[4];
    const currentBlock = values[7];

    setBlockNumber(currentBlock);
    setUserMetrics(userMetrics);
    setStakingState({
      //...stakingState,
      stakedSymbol: values[0],
      rewardSymbol: values[1],
      longTokenBalance: values[2],
      tokenBalance: parseValue(values[2]),
      stakingAllowance,
      stakedBalance: parseValue(values[6]),
      availableRewards: parseValue(values[5]),
      // totalPoolRewards: parseValue(poolMetrics.rewards),
      totalPoolStaked: parseValue(poolMetrics.staked),
      // currentPoolFee: (poolMetrics.stakingFee / 10).toFixed(2)
    })

    if (showApproveButton && stakingAllowance > 0) setShowApproveButton(false);
    isLoading && setLoading(false);
  }

  const parseValue = (value) => {
    const wei = web3.utils.fromWei(value)
    return (Math.floor(+wei * 100) / 100).toFixed(2);
  }

  const approveStaking = async () => {
    setApproving(true);
    const totalSupply = await tokenContract.methods.totalSupply().call();
    tokenContract.methods.approve(contractId, totalSupply).send({from: accounts[0]})
      .then((data) => {
        toast.success(<TooltipMessage title='✅ Success' message={`Successfully approved ${stakingState.stakedSymbol}-${stakingState.rewardSymbol} staking.`} />);
        setShowApproveButton(false);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(<TooltipMessage title="⛔️ Error" message="Encountered an error, could not approve staking." />);
      })
      .finally(() => {
        setApproving(false);
      });
  }

  const stakeToken = async () => {
    if (checkAntiSpam()) return;
    setStaking(true);
    console.log(stakingState.stakedBalance, stakingState.totalPoolStaked)
    if (stakeAction === 'Stake' && stakingState.stakedBalance > (stakingState.totalPoolStaked * 0.20)) {
      toast.warning(<TooltipMessage title="🐳 Whale Alert!" message="Your current stake is >= 20% of the total pool. You may not stake more until your staked balance falls below 20%." />)
      setStaking(false);
      return;
    }
    const tokens = web3.utils.toWei(stakeAmountInput.toString(), 'ether');
    const stakeAmount = web3.utils.toBN(tokens);
    farmingContract.methods.stake(stakeAmount).send({from: accounts[0]})
      .then((data) => {
        toast.success(<TooltipMessage title="✅ Success" message={`Successfully staked ${stakeAmountInput} ${stakingState.stakedSymbol}.`} />)
        setLastTransaction(data.blockNumber);
      })
      .catch((err) => {
        // console.log(err)
        toast.error(<TooltipMessage title="⛔️ Error" message="Encountered an error, could not stake tokens." />)
      })
      .finally(() => {
        setOpen(false);
        setStakeAmountInput('');
        setStaking(false);
      });
  }

  const unStakeToken = async () => {
    if (checkAntiSpam()) return;
    setStaking(true);
    const tokens = web3.utils.toWei(stakeAmountInput.toString(), 'ether');
    const unstakeAmount = web3.utils.toBN(tokens);
    farmingContract.methods.unStake(unstakeAmount).send({from: accounts[0]})
      .then((data) => {
        //console.log(data)
        toast.success(<TooltipMessage title="✅ Success" message={`Successfully unstaked ${stakeAmountInput} ${stakingState.stakedSymbol}.`} />);
        setLastTransaction(data.blockNumber);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(<TooltipMessage title="⛔️ Error" message="Encountered an error, could not unstake tokens." />)
      })
      .finally(() => {
        setOpen(false);
        setStaking(false);
        setStakeAmountInput('');
      });
  }

  // take reward
  const takeRewards = () => {
    if (checkAntiSpam()) return;
    setClaiming(true);
    farmingContract.methods.takeRewards().send({from: accounts[0]})
      .then((data) => {
        toast.success(<TooltipMessage title="✅ Success" message={`Successfully claimed ${stakingState.rewardSymbol} rewards.`} />);
        setLastTransaction(data.blockNumber);
      })
      .catch((err) => {
        // console.log(err)
        toast.error(<TooltipMessage title="⛔️ Error" message="Encountered an error, could not claim rewards." />)
      })
      .finally(() => {
        setClaiming(false);
      });
  }

  const checkAntiSpam = () => {
    if (blockNumber === lastTransaction) {
      toast.warn(<TooltipMessage title="🤖 AntiSpam Alert!" message="You just interacted with this pool! Wait 1 block to perform this action and try again." />)
      return true;
    }
    return false;
  }

  const handleStake = () => {
    setStakeAction('Stake');
    setOpen(true);
  }

  const handleUnstake = () => {
    setStakeAction('Unstake');
    setOpen(true);
  }

  const handleMax = () => {
    if (stakeAction === 'Stake') {
      setStakeAmountInput(web3.utils.fromWei(stakingState.longTokenBalance));
    } else {
      setStakeAmountInput(web3.utils.fromWei(userMetrics.stake));
    }
  }

  const handleToggle = () => {
    if (isOpen) {
      setStakeAmountInput('')
    }
    setOpen(!isOpen);
  }

  // determine if the initial amount is within bounds
  const shouldDisableButton = (maxBound) => {
    if (stakeAmountInput.includes('.') && stakeAmountInput.split(".")[1].length > 18) {
      return true
    }
    if (isNaN(stakeAmountInput) || +stakeAmountInput <= 0 || +stakeAmountInput > maxBound) {
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
              <img alt="loading" src={require("assets/img/Farm-Loading.gif")} />
            </Col>
          </Row>
        </div>
      ) : (
        <Container>
          <div className="d-flex justify-content-start">
            <Link to="/dashboard/staking">
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

          <div className="p-2 mb-4">
            <img src={poolContent.img} width="100" height="auto" alt="defiat" />
          </div>
          
          <h1 className="text-primary mb-2">
            {poolContent.poolTitle}
          </h1>
          <p className="text-tertiary mb-2">{poolContent.poolSubtitle}</p>
          <div className="d-flex justify-content-center mb-4">
            <Input className="m-0 text-right" onChange={(e) =>{}} value={contractId} style={{width: "330px"}} />
          </div>
          

          <Row className="justify-content-center">
            <Col lg="5" className="d-flex">
              <Card className="shadow">
                <CardBody className="text-left">
                  <Tooltip placement="left" isOpen={tooltip1Open} target={`tooltip-1`} toggle={toggle1}>
                    This is the total amount of {stakingState.rewardSymbol} that you have earned through staking.
                  </Tooltip>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-end">
                      <h2 className="mb-0">{stakingState.availableRewards}</h2>
                      <p className='mb-0'>&nbsp;{stakingState.rewardSymbol}</p>
                    </div>
                    <MdInfoOutline className={`text-primary h3 mb-0`} id={`tooltip-1`} />
                  </div>
                  <small className="text-muted">Available Rewards</small>
                  <hr className="line-primary w-100" />
                  <Button 
                    color="info" 
                    className="w-100"
                    onClick={() => takeRewards()}
                    disabled={isClaiming || +stakingState.availableRewards === 0}
                  >
                    {isClaiming ? "Claiming Rewards..." : "Claim Rewards"}
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col lg="5" className="d-flex">
              <Card className="shadow">
                <CardBody className="text-left">
                  <Tooltip placement="left" isOpen={tooltip2Open} target={`tooltip-2`} toggle={toggle2}>
                    This is the total amount of {stakingState.stakedSymbol} that you have staked into this pool. You must approve the staking contract before you can stake.
                    Anti-Whale gates are in effect: if you have more than 20% of the total pool, you may not stake more until your % falls below the threshold.
                  </Tooltip>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-end">
                      <h2 className="mb-0">{stakingState.stakedBalance}</h2>
                      <p className='mb-0'>&nbsp;{stakingState.stakedSymbol}</p>
                    </div>
                    <MdInfoOutline className={`text-primary h3 mb-0`} id={`tooltip-2`} />
                  </div>
                  <small className="text-muted">Staked Balance</small>
                  <hr className="line-primary w-100" />
                  {showApproveButton ? (
                    <Button
                      className="w-100"
                      color="info"
                      onClick={() => approveStaking()}
                      disabled={isApproving}
                    >
                      {isApproving ? "Approving..." : `Approve ${stakingState.stakedSymbol} Staking`}
                    </Button>
                  ) : (
                    <Row>
                      <Col>
                        <Button
                          className="w-100"
                          color="info"
                          onClick={() => handleStake()}
                          // onClick={() => stakeToken()}
                          // disabled={isStaking || shouldDisableButton(stakeAmountInput, stakingState.tokenBalance)}
                        >
                          Stake
                        </Button>
                      </Col>
                      <Col>
                        <Button
                        className="w-100"
                          color="info"
                          onClick={() => handleUnstake()}
                          // onClick={() => unStakeToken()}
                          // disabled={isUnstaking || shouldDisableButton(unstakeAmountInput, stakingState.stakedBalance)}
                        >
                          Unstake
                        </Button>
                      </Col>
                    </Row>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Button 
              color="primary"
              target="_blank"
              href={poolContent.isLiquidityToken ? `https://app.uniswap.org/#/add/${poolContent.basePool}/ETH` : `https://app.uniswap.org/#/swap?inputCurrency=${poolContent.basePool}`}
            >
              Get {stakingState.stakedSymbol} on Uniswap
            </Button>
          </div>


          <Modal 
            modalClassName="modal-black"
            isOpen={isOpen} 
            size="md"
            toggle={handleToggle} 
          >
            <ModalHeader
              close={<button className="close" onClick={handleToggle}>&times;</button>}
            >
              <span className="text-primary display-4">{stakeAction} {stakingState.stakedSymbol}</span>
            </ModalHeader>
            <ModalBody>
              <div className="d-flex justify-content-between align-items-center">
                <p>{stakeAction === "Stake" ? "Available Balance:" : "Staked Balance:"}</p>
                <b>{stakeAction === "Stake" ? stakingState.tokenBalance : stakingState.stakedBalance} {stakingState.stakedSymbol}</b>
              </div>
              <Row>
                <Col sm="8">
                  <Input
                    type="number"
                    value={stakeAmountInput}
                    onChange={(e) => setStakeAmountInput(e.target.value)}
                    placeholder="Enter an amount..."
                    disabled={isStaking}
                  />
                </Col>
                <Col sm="4">
                  <Button 
                    className="m-0 w-100" 
                    color="primary"
                    onClick={() => handleMax()}
                    disabled={isStaking}
                  >
                    MAX
                  </Button>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter className="pt-2 justify-content-between">
              <Button
                className="m-0 w-100"
                color="info"
                disabled={isStaking || (stakeAction === "Stake" ? shouldDisableButton(web3.utils.fromWei(stakingState.longTokenBalance)) : shouldDisableButton(web3.utils.fromWei(userMetrics.stake)))}
                onClick={stakeAction === "Stake" ? () => stakeToken() : () => unStakeToken()}  
              >
                {stakeAction === "Stake" ? (
                  <>
                    {isStaking ? "Staking..." : `Stake ${stakingState.stakedSymbol}`}
                  </>
                ) : (
                  <>
                    {isStaking ? "Unstaking..." : `Unstake ${stakingState.stakedSymbol}`}
                  </>
                )}&nbsp;
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      )}
    </>
  )
}