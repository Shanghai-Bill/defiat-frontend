import React from 'react'
import { 
  Row,
  Container,
  Col
} from 'reactstrap'
import ScrollAnimation from 'react-animate-on-scroll';

export const FeatureSection = () => {
  return (
    <section className="section section-lg">
      <section className="section">
        <img
          alt="..."
          className="bg landing-3 floating"
          src={require("assets/img/points.png")}
        />
        <img
          alt="..."
          className="bg landing-4 floating"
          src={require("assets/img/points.png")}
        />
        <img
          alt="..."
          className="bg landing-5 floating"
          src={require("assets/img/treasury.png")}
        />

        <Container>
          <Row className="row-grid justify-content-center">
            <Col lg="12">
              <ScrollAnimation animateIn="fadeInUp">
                <h1 className="text-center text-tertiary">The DeFiat Ecosystem</h1>
              </ScrollAnimation>

              <ScrollAnimation animateIn="fadeInUp">
                <Row className="row-grid justify-content-center">
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-primary">
                        <i className="tim-icons icon-bank" />
                      </div>
                      <h4 className="info-title">Governance</h4>
                      <hr className="line-primary" />
                      <p className="text-tertiary">
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
                      <p className="text-tertiary">
                        Multi-Tiered transaction fee and burn discounts for active
                        participants in the DFT ecosystem. Performing any transaction
                        on the DFT network will earn you loyalty points which can unlock
                        up to a 90% discount!
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-primary">
                        <i className="tim-icons icon-lock-circle" />
                      </div>
                      <h4 className="info-title">Staking</h4>
                      <hr className="line-primary" />
                      <p style={{color: "##a99cff"}}>
                        DeFiat's original UniStake protocol allows you to make your
                        ERC20 tokens work for you. Staking ERC20 tokens allows you to collect
                        interest as others enter and exit the staking pool, resulting
                        in very competitive interest rates.
                      </p>
                    </div>
                  </Col>
                </Row>
              </ScrollAnimation>
            </Col>
          </Row>
          
        </Container>
      </section>
    </section>
  )
}