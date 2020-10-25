import React, { useCallback, useState, useMemo } from 'react'
import {
  Container,
  Row,
  Button,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import Rug_Sanctuary from 'contracts/secondchance/Rug_Sanctuary.json'
import { usePerpetualDeposit } from 'hooks/usePerpetualDeposit'
import { usePerpetualWithdraw } from '../../../hooks/usePerpetualWithdraw'
import { ChancePoolClaimCard } from './ChancePoolClaimCard'
import BigNumber from 'bignumber.js'
import { ChancePoolStakeCard } from './ChancePoolStakeCard'
import { ChancePoolModal } from './ChancePoolModal'

export const ChancePoolInterface = ({
  accounts,
  web3,
  network
}) => {
  // const { path } = useRouteMatch();
  // const { contractId } = useParams();
  const { secondPool } = network
  const {
    poolAddress,
    poolLogo,
    poolTitle,
    poolSubtitle,
    rewardAddress,
    stakedSymbol,
  } = secondPool

  const farmingContract = useMemo(() => {
    return new web3.eth.Contract(Rug_Sanctuary.abi, poolAddress)
  }, [web3, accounts])
  
  const { onWithdraw } = usePerpetualWithdraw(web3, accounts[0], poolAddress)
  const { onDeposit } = usePerpetualDeposit(web3, accounts[0], poolAddress)

  // Inputs
  const [isStaking, setStaking] = useState(false);
  const [isClaiming, setClaiming] = useState(false);
  
  // Modal
  const [isOpen, setOpen] = useState(false);
  const [stakeAction, setStakeAction] = useState('');


  const getBoost = async () => {
    if (farmingContract) {
      const boost = await farmingContract.methods.myBoost(accounts[0]).call()
      return boost;
    }
    return 0
  }

  // take reward
  const handleClaim = useCallback(async () => {
    setClaiming(true);
    await onWithdraw(new BigNumber(0))
    setClaiming(false)
  }, [onWithdraw, setClaiming])

  const handleAction = (action) => {
    console.log(action)
    setStakeAction(action);
    setOpen(true);
  }

  const handleStake = useCallback(async (amount) => {
    setStaking(true)
    if (stakeAction === 'Stake') {
      await onDeposit(amount)
    } else {
      await onWithdraw(amount)
    }
    setStaking(false)
  }, [stakeAction, onDeposit, onWithdraw, setStaking])

  const handleToggle = () => {
    setOpen(!isOpen);
  }

  return (
    <Container>
      <div className="d-flex justify-content-start">
        <Link to={"/dashboard/secondchance"}>
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
        {/* <img 
          src={require('assets/img/boost-logo.png')}
          className="floating"
          style={{
            height: "40px",
            position: "absolute",
            width: "auto"
          }}
        /> */}
        <img src={poolLogo} width="100" height="auto" alt="defiat" />
      </div>
      
      <h1 className="text-primary mb-2">
        {poolTitle}
      </h1>
      <p className="text-tertiary mb-2">
        {poolSubtitle}
        
      </p>
      {/* <p className="text-secondary mb-2">
        <b>Farming Boost: {stakingState.myBoost}%</b>
      </p> */}
      

      <Row className="justify-content-center">
        <ChancePoolClaimCard
          web3={web3}
          accounts={accounts}
          network={network}
          handleClaim={handleClaim}
          shouldDisable={isClaiming || isStaking}
        />
        <ChancePoolStakeCard
          web3={web3}
          accounts={accounts}
          network={network}
          handleAction={(action) => handleAction(action)}
          shouldDisable={isClaiming || isStaking}
        />
      </Row>
      <div className="d-flex justify-content-center">
        <Button 
          color="primary"
          target="_blank"
          href={`https://app.uniswap.org/#/add/${rewardAddress}/ETH`}
        >
          Get {stakedSymbol} on Uniswap
        </Button>
      </div>
      {/* <p className="text-tertiary my-2">
        <b>
          * Farming Boost is a staking multiplier earned by staking in the DFT Dungeon
          <br/>
          You can earn up to 200% Boost by staking 100 DFT.
        </b>
      </p> */}
      
        
      <ChancePoolModal
        web3={web3}
        accounts={accounts}
        network={network}
        stakeAction={stakeAction}
        isOpen={isOpen}
        handleStake={(amount) => handleStake(amount)}
        handleToggle={handleToggle}
      />
    </Container>
  )
}