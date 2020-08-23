import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import ScrollAnimation from 'react-animate-on-scroll';
import ecosystem from 'assets/img/ecosystem.png'

export const StatSection = () => {
  return (
    <section className="section section-lg">
      <section className="section">
        <img
          alt="..."
          className="bg landing-6 floating"
          src={require("assets/img/treasury.png")}
        />
        <Container>
          <Row className="row-grid justify-content-between">
            <Col className="mt-lg-5" md="5">
              <ScrollAnimation animateIn="fadeInLeft" duration={3}>
                <img
                  src={ecosystem}
                  alt="ecosystem"
                  className="img-fluid"
                />
              </ScrollAnimation>
            </Col>
            <Col md="6">
              <ScrollAnimation animateIn="fadeInRight" duration={3}>
                <div className="pl-md-5">
                  <h1>
                    The DeFiat Ecosystem
                  </h1>
                  <p>
                    DeFiat (DFT) is the first token with fully-embedded governance, 
                    loyalty discounts, and deflationary mechanisms at its core.
                    Decisions made on the DeFiat network are voted on and fully
                    orchestrated by DFT holders. Every time a transaction occurs on
                    the network, a fee is distributed to network participants and
                    tokens are burned to facilitate the transaction, naturally decreasing
                    supply.
                  </p>
                  <br />
                  <p>
                    DeFiat's main offering is it's Unified-Staking (UniStake) pools.
                    UniStake supports staking for any ERC20 token and is powered by the DFT 
                    network, generating an additional source of token burn. Liquidity 
                    allocations to UniStake pools will be determined by DFT governance.
                  </p>
                  <br />
                  <Link
                    className="font-weight-bold text-info mt-5"
                    to="/news"
                  >
                    See the latest updates{" "}
                    <i className="tim-icons icon-minimal-right text-info" />
                  </Link>
                </div>
              </ScrollAnimation>
            </Col>
          </Row>
        </Container>
      </section>
    </section>
  )
}