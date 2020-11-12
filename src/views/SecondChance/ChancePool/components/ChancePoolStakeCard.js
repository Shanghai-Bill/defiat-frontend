import React, { useCallback, useState } from 'react'
import { Col, Card, CardBody, Button, Row, Tooltip } from 'reactstrap'
import { MdInfoOutline } from 'react-icons/md'
import { getDisplayBalance } from 'utils/formatBalance'
import { useApprove } from 'hooks/useApprove'
import { useAllowance } from 'hooks/useAllowance'
import { usePerpetualStakedBalance } from 'hooks/usePerpetualStakedBalance'

export const ChancePoolStakeCard = ({
  web3,
  accounts,
  network,
  handleAction,
  shouldDisable
}) => {
  const { secondPool } = network
  const {
    poolAddress,
    stakedAddress,
    stakedSymbol
  } = secondPool
  const [approving, setApproving] = useState(false)
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  const { onApprove } = useApprove(web3, accounts[0], stakedAddress, poolAddress)
  const allowance = useAllowance(web3, accounts[0], stakedAddress, poolAddress)
  const stakedBalance = usePerpetualStakedBalance(web3, accounts[0], poolAddress)

  const handleApprove = useCallback(async () => {
    setApproving(true)
    await onApprove("2ND-UNI-V2 staking")
    setApproving(false)
  }, [onApprove])

  return (
    <Col lg="5" className="d-flex">
      <Card className="shadow">
        <CardBody className="text-left">
          <Tooltip
            placement="left"
            target="tooltip-staked"
            isOpen={open}
            toggle={toggle}
          >
            This is the total amount of {stakedSymbol} that you have staked into this pool. You must approve the staking contract before you can stake.
          </Tooltip>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-end">
              <h2 className="mb-0">{getDisplayBalance(stakedBalance)}</h2>
              <p className='mb-0'>&nbsp;{stakedSymbol}</p>
            </div>
            <MdInfoOutline 
              className="text-primary h3 mb-0" 
              id="tooltip-staked"
            />
          </div>
          <small className="text-muted">Staked Balance</small>
          <hr className="line-primary w-100" />
          {allowance.eq(0) ? (
            <Button
              className="w-100"
              color="info"
              onClick={handleApprove}
              disabled={approving}
            >
              {approving ? "Approving..." : `Approve ${stakedSymbol} Staking`}
            </Button>
          ) : (
            <Row>
              <Col>
                <Button
                  className="w-100"
                  color="info"
                  disabled={shouldDisable}
                  onClick={() => handleAction('Stake')}
                >
                  Stake
                </Button>
              </Col>
              
              <Col>
                <Button
                  className="w-100"
                  color="info"
                  disabled={shouldDisable}
                  onClick={() => handleAction('Unstake')}
                >
                  Unstake
                </Button>
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>
    </Col>
  )
}
