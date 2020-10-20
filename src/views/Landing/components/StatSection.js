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
              <ScrollAnimation animateIn="fadeInLeft" animateOnce>
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={ecosystem}
                    alt="ecosystem"
                    width="400"
                    height="auto"
                  />
                </div>
              </ScrollAnimation>
            </Col>
            <Col md="6">
              <ScrollAnimation animateIn="fadeInRight" animateOnce>
                <div className="pl-md-5">
                  <h1 className="text-primary">
                    The DeFiat Philosophy
                  </h1>
                  <p>
                    DeFiat (DFT) is the first token with fully-embedded governance, 
                    loyalty discounts, and deflationary mechanisms at its core.
                    Decisions made on the DeFiat network are voted on and fully
                    orchestrated by DFT holders. Every time a transaction occurs on
                    the network, a fee is distributed to network participants and
                    tokens are burned to facilitate the transaction, naturally decreasing
                    supply. Transaction fees are repurposed as staking rewards, creating a
                    circular economy.
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