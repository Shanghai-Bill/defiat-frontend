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
                        {/* <i className="tim-icons icon-bank" /> */}
                        <img src={require("assets/img/defiat.png")} alt='gov' width="auto" height="50" />
                      </div>
                      <h4 className="info-title">Token</h4>
                      <hr className="line-primary" />
                      <p className="text-tertiary">
                        Strictly deflationary token that fuels the network, enabling
                        holders to participate in governance decisions and access DeFiat Services.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-primary">
                        {/* <i className="tim-icons icon-bank" /> */}
                        <img src={require("assets/img/governance.png")} alt='gov' width="auto" height="50" />
                      </div>
                      <h4 className="info-title">Governance</h4>
                      <hr className="line-primary" />
                      <p className="text-tertiary">
                        Fully-embedded governance model which allows participants to regulate
                        Token Burn, Fee Rates, Staking Rewards, and more.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-primary">
                        {/* <i className="tim-icons icon-money-coins" /> */}
                        <img src={require("assets/img/points.png")} alt='points' width="auto" height="50" />
                      </div>
                      <h4 className="info-title">Loyalty Points</h4>
                      <hr className="line-primary" />
                      <p className="text-tertiary">
                        Secondary, inflationary asset which is earned through network participation.
                        Rewards a discount on DFT transaction fee and burn rates.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-primary">
                        {/* <i className="tim-icons icon-lock-circle" /> */}
                        <img src={require("assets/img/services.png")} alt='services' width="auto" height="50" />
                      </div>
                      <h4 className="info-title">Services</h4>
                      <hr className="line-primary" />
                      <p>
                        Native staking of DFT, as well as the ability to stake any ERC-20 token, awards
                        yield from the DeFiat Treasury.
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