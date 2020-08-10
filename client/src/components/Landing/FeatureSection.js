import React from 'react'
import { 
  Row,
  Container,
  Col
} from 'reactstrap'

export const FeatureSection = () => {
  return (
    <section className="section section-lg">
      <section className="section">
        <img
          alt="..."
          className="path"
          src={require("assets/img/path4.png")}
        />
        <Container>
          <Row className="row-grid justify-content-center">
            <Col lg="12">
              <h1 className="text-center">Core Network Protocols</h1>
              <Row className="row-grid justify-content-center">
                <Col lg="3">
                  <div className="info">
                    <div className="icon icon-warning">
                      <i className="tim-icons icon-bank" />
                    </div>
                    <h4 className="info-title">Governance</h4>
                    <hr className="line-warning" />
                    <p>
                      Fully-embedded governance model which puts the control of the
                      DFT network into the hands of the participants. DFT holders can
                      vote on network decisions, allocate UniStake liquidity, change 
                      Burn and Fee rates, and more.
                    </p>
                  </div>
                </Col>
                <Col lg="3">
                  <div className="info">
                    <div className="icon icon-primary">
                      <i className="tim-icons icon-money-coins" />
                    </div>
                    <h4 className="info-title">Loyalty Discounts</h4>
                    <hr className="line-primary" />
                    <p>
                      Multi-Tiered transaction fee and burn discounts for active
                      participants in the DFT ecosystem. Performing any transaction
                      on the DFT network will earn you loyalty points which can unlock
                      up to a 90% discount!
                    </p>
                  </div>
                </Col>
                <Col lg="3">
                  <div className="info">
                    <div className="icon icon-success">
                      <i className="tim-icons icon-lock-circle" />
                    </div>
                    <h4 className="info-title">Staking</h4>
                    <hr className="line-success" />
                    <p>
                      DeFiat's original UniStake protocol allows you to make your
                      ERC20 tokens work for you. Staking ERC20 tokens allows you to collect
                      interest as others enter and exit the staking pool, resulting
                      in very competitive interest rates.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </section>
  )
}