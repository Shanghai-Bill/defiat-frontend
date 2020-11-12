import React, { useCallback, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button, Input } from 'reactstrap'
import { usePerpetualWithdraw } from 'hooks/usePerpetualWithdraw'
import { usePerpetualStakedBalance } from 'hooks/usePerpetualStakedBalance'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { getDisplayBalance, getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { getInputNumber } from 'utils/formatBalance'

export const ChancePoolModal = ({
  web3,
  accounts,
  network,
  stakeAction,
  isOpen,
  handleStake,
  handleToggle
}) => {
  const { secondPool } = network
  const {
    poolAddress,
    stakedAddress,
    stakedSymbol
  } = secondPool

  const stakedBalance = usePerpetualStakedBalance(web3, accounts[0], poolAddress)
  const tokenBalance = useTokenBalance(web3, accounts[0], stakedAddress)

  const [stakeAmountInput, setStakeAmountInput] = useState('')

  const handleMax = () => {
    if (stakeAction === 'Stake') {
      setStakeAmountInput(getFullDisplayBalance(tokenBalance))
    } else {
      setStakeAmountInput(getFullDisplayBalance(stakedBalance))
    }
  }

  const onToggle = () => {
    setStakeAmountInput('')
    handleToggle()
  }

  const onStake = useCallback(async () => {
    const amount = getInputNumber(stakeAmountInput)
    onToggle()
    await handleStake(amount)
  }, [getInputNumber, handleStake, stakeAmountInput])

  // determine if the initial amount is within bounds
  const shouldDisableButton = () => {
    // more than 18 decimals
    if (stakeAmountInput.includes('.') && stakeAmountInput.split(".")[1].length > 18) {
      return true
    }
    // invalid input
    if (isNaN(stakeAmountInput) || +stakeAmountInput <= 0) {
      return true;
    }
    // more than inputs
    const amount = getInputNumber(stakeAmountInput)
    if (stakeAction === 'Stake' && amount.gt(tokenBalance) || stakeAction === 'Unstake' && amount.gt(stakedBalance)) {
      return true;
    } 

    return false;
  }

  return (
    <Modal 
      modalClassName="modal-black"
      size="md"
      isOpen={isOpen} 
      toggle={onToggle} 
    >
      <ModalHeader
        close={<button className="close" onClick={onToggle}>&times;</button>}
      >
        <span className="text-primary display-4">{stakeAction} {stakedSymbol}</span>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-between align-items-center">
          <p>{stakeAction === "Stake" ? "Available Balance:" : "Staked Balance:"}</p>
          <b>{stakeAction === "Stake" ? getDisplayBalance(tokenBalance) : getDisplayBalance(stakedBalance)} {stakedSymbol}</b>
        </div>
        <Row>
          <Col sm="8">
            <Input
              type="number"
              placeholder="Enter an amount..."
              value={stakeAmountInput}
              onChange={(e) => setStakeAmountInput(e.target.value)}
            />
          </Col>
          <Col sm="4">
            <Button 
              className="m-0 w-100" 
              color="primary"
              onClick={handleMax}
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
          disabled={shouldDisableButton() === true}
          onClick={onStake}
        >
          {stakeAction === "Stake" ? `Stake ${stakedSymbol}` : `Unstake ${stakedSymbol}`}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
