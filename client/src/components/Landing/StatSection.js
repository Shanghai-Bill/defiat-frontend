import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap'

export const StatSection = () => {
  return (
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
            </Col>
          </Row>
        </Container>
      </section>
    </section>
  )
}