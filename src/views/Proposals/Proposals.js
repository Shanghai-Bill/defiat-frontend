import React from 'react'
import { Container, Row } from 'reactstrap'
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
    <Container>
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