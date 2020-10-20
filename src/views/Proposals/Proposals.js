import React, { useEffect, useState } from 'react'
import constants from 'constants'
import {
  Container,
  Row,
  Col, Badge
} from 'reactstrap'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { ProposalInterface } from './ProposalInterface'
import { ProposalCard } from './ProposalCard'

export const Proposals = ({
  web3,
  network,
  accounts
}) => {
  const { path } = useRouteMatch();

  return (
    <>
      <Container>
        {/* <Row className="ml-0 mr-0">
          <h2 className="mb-0">DeFiat Governance</h2>
          {network && network.proposals && 
            <Badge>{network.proposals.length} Proposals</Badge>
          }
        </Row> */}
        <Switch>
          <Route exact path={path}>
            {network && network.proposals.map((proposal, i) => (
              <ProposalCard
                key={i}
                web3={web3}
                network={network}
                accounts={accounts}
                {...proposal}
              />
            ))}
          </Route>
          <Route path={`${path}/:proposalId`}>
            <ProposalInterface
              web3={web3}
              network={network}
              accounts={accounts}
              
            />
          </Route>
        </Switch>
      </Container>
    </>
  )
}

const ProposalItem = ({
  title,
  startDate,
  endDate
}) => {
  return (
    <>
      <h3 className="text-primary">{title}</h3>
      <Row>
        <p>Vote Opens: <b>{startDate}</b></p>
        <p>Vote Closes: <b>{endDate}</b></p>
      </Row>
    </>
  )
}