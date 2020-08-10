import React from 'react'
import { Link } from 'react-router-dom'
import { SocialButtons } from '../SocialButtons'
import {
  Row,
  Col,
  Button
} from 'reactstrap'

export const HeaderSection = () => {
  return (
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
              Finance used to be controlled by large institutions. Not anymore. 
              Decentralized technology has taken the ledger public and yields
              are higher than ever before. Join the revolution and start your own
              financial liberation today.
            </p>
            <div className="btn-wrapper mb-3">
              <Link to="/about">
                <p className="category text-success d-inline">
                  Learn More
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
  )
}