import React, { useCallback, useState } from 'react'
import { Col, Card, CardBody, Button, Tooltip } from 'reactstrap'
import { MdInfoOutline } from 'react-icons/md'
import { usePerpetualRewardBalance } from 'hooks/usePerpetualRewardBalance'
import { getDisplayBalance } from 'utils/formatBalance'

export const ChancePoolClaimCard = ({
  web3,
  accounts,
  network,
  handleClaim,
  shouldDisable
}) => {
  const { secondPool } = network
  const {
    poolAddress,
    rewardSymbol
  } = secondPool
  const [claiming, setClaiming] = useState(false)
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  const pendingBalance = usePerpetualRewardBalance(web3, accounts[0], poolAddress)

  const onClaim = useCallback(async () => {
    setClaiming(true)
    await handleClaim()
    setClaiming(false)
  }, [handleClaim])

  return (
    <Col lg="5" className="d-flex">
      <Card className="shadow">
        <CardBody className="text-left">
          <Tooltip
            target="tooltip-rewards"
            placement="left"
            isOpen={open}
            toggle={toggle}
          >
            This is the total amount of {rewardSymbol} you have earned through staking.
          </Tooltip>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-end">
              <h2 className="mb-0">
                {getDisplayBalance(pendingBalance)}
              </h2>
              <p className='mb-0'>&nbsp;{rewardSymbol}</p>
            </div>
            <MdInfoOutline 
              className="text-primary h3 mb-0" 
              id="tooltip-rewards" 
            />
          </div>
          <small className="text-muted">Available Rewards</small>
          <hr className="line-primary w-100" />
          <Button 
            color="info" 
            className="w-100"
            onClick={onClaim}
            disabled={shouldDisable || pendingBalance.eq(0)}
          >
            {claiming ? "Claiming Rewards..." : "Claim Rewards"}
          </Button>
        </CardBody>
      </Card>
    </Col>
  )
}
