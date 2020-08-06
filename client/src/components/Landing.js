import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";
import { SocialButtons } from './SocialButtons';
import { Link } from 'react-router-dom'

export function Landing(props) {
  return (
    <>
      <div className="landing-page">
        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="path"
              src={require("assets/img/blob.png")}
            />
            <img
              alt="..."
              className="path2"
              src={require("assets/img/path2.png")}
            />
            <img
              alt="..."
              className="shapes triangle"
              src={require("assets/img/triunghiuri.png")}
            />
            <img
              alt="..."
              className="shapes wave"
              src={require("assets/img/waves.png")}
            />
            <img
              alt="..."
              className="shapes squares"
              src={require("assets/img/patrat.png")}
            />
            <img
              alt="..."
              className="shapes circle"
              src={require("assets/img/cercuri.png")}
            />
            <div className="content-center">
              <Row className="row-grid justify-content-between align-items-center text-left">
                <Col lg="6" md="6">
                  <h1 className="text-gray">
                    <span className="text-white font-weight-bold display-3">DeFiat</span> <br />
                    A new brand of decentralized finance
                  </h1>
                  <p className="text-white mb-3">
                    Finance used to be controlled by the big whigs. Not anymore. 
                    Decentralized technology has taken the ledger public and yields
                    are higher than ever before. Join the revolution and start your own
                    financial liberation today.
                  </p>
                  <div className="btn-wrapper mb-3">
                    <Link to="/whitepaper">
                      <p className="category text-success d-inline">
                        Read the Whitepaper
                      </p>
                      <Button
                        className="btn-link"
                        color="success"
                        size="sm"
                      >
                        <i className="tim-icons icon-minimal-right" />
                      </Button>
                    </Link>
                  </div>
                  <SocialButtons />
                </Col>
                <Col lg="4" md="5">
                  <img
                    alt="..."
                    className="img-fluid"
                    src={require("assets/img/defiat.png")}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <section className="section section-lg">
          <section className="section">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png")}
            />
            <Container>
              <Row className="row-grid justify-content-between">
                <Col className="mt-lg-5" md="5">
                  <Row>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-bank text-info" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">45K</CardTitle>
                                <p />
                                <p className="card-category">Transactions</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats upper bg-default">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-coins text-white" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">59K</CardTitle>
                                <p />
                                <p className="card-category">Staking</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-key-25 text-warning" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">2M</CardTitle>
                                <p />
                                <p className="card-category">Addresses</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-chart-pie-36 text-success" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">120M</CardTitle>
                                <p />
                                <p className="card-category">Total Supply</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <div className="pl-md-5">
                    <h1>
                      Tokenomics
                    </h1>
                    <p>
                      Here we can list all the unique features of the 
                      DeFiat token ecosystem, such as governance, 
                      burn rates, etc.
                    </p>
                    <br />
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing 
                      elit, sed do eiusmod tempor incididunt ut labore et 
                      dolore magna aliqua. Ut enim ad minim veniam, quis 
                      nostrud exercitation ullamco laboris nisi.
                    </p>
                    <br />
                    <Link
                      className="font-weight-bold text-info mt-5"
                      to="/tokenomics"
                    >
                      Show all{" "}
                      <i className="tim-icons icon-minimal-right text-info" />
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </section>


        <section className="section section-lg">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path5.png")}
          />
          <img
            alt="..."
            className="path3"
            src={require("assets/img/path2.png")}
          />
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <h1 className="text-center">Unique Selling Points</h1>
                <Row className="row-grid justify-content-center">
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-primary">
                        <i className="tim-icons icon-money-coins" />
                      </div>
                      <h4 className="info-title">Burn Rates</h4>
                      <hr className="line-primary" />
                      <p>
                        Details about how burn is calculated, when
                        it is taken, any other info on this feature here.
                        We can add more feature panes and rows if needed.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-warning">
                        <i className="tim-icons icon-chart-pie-36" />
                      </div>
                      <h4 className="info-title">Governance</h4>
                      <hr className="line-warning" />
                      <p>
                        List the features of voting shares and governance here.
                        Fee discounts, on-chain permissions, etc.
                        Lorem ipsum dolor sit amet, consectetur adipiscing.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-success">
                        <i className="tim-icons icon-single-02" />
                      </div>
                      <h4 className="info-title">Staking</h4>
                      <hr className="line-success" />
                      <p>
                        Staking allows you to make your DFT token work for you.
                        You accumulate a portion of network fees and burn.
                        Lorem ipsum dolor sit amet, consectetur adipiscing.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  )
}

Landing.propTypes = {
  web3: PropTypes.object,
};

Landing.defaultProps = {
  web3: null,
};

export default Landing;