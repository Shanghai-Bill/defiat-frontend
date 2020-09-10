import React from 'react'
import constants from 'constants'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

export const Proposals = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Container>
        <Row className="justify-content-between">
          <h2>DeFiat Governance</h2>
          <h2>{} Proposals.</h2>
        </Row>
        <Switch>
          <Route exact path={path}>

          </Route>
          <Route path={`${path}/:proposalId`}>

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