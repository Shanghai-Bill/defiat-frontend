import React from 'react'
import { Link } from 'react-router-dom'
import { SocialButtons } from 'components/SocialButtons'
import {
  Row,
  Col
} from 'reactstrap'
import ScrollAnimation from 'react-animate-on-scroll';


export const HeaderSection = () => {
  return (
    <div className="page-header">
      <img
        alt="..."
        className="bg landing-1 floating"
        src={require("assets/img/burn.png")}
      />
      <img
        alt="..."
        className="bg landing-2 floating"
        src={require("assets/img/burn.png")}
      />

      
      <div className="content-center">
        <Row className="row-grid justify-content-between align-items-center text-left">
        
          <Col lg="6" md="6">
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              <h1 className="text-tertiary">
                <span className="text-primary font-weight-bold display-3">DeFiat</span> <br />
                A new brand of decentralized finance
              </h1>
              <p className="text-gray mb-3">
                Finance used to be controlled by large institutions. Not anymore. 
                Decentralized technology has taken the ledger public and yields
                are higher than ever before. Join the revolution and start your own
                financial liberation today.
              </p>
              <SocialButtons />
            </ScrollAnimation>
          </Col>

          
          <Col lg="4" md="5">
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              <img
                alt="..."
                height="300"
                className="img-fluid"
                src={require("assets/img/defiat_400x400.png")}
                style={{zIndex:5}}
              />
            </ScrollAnimation>
          </Col>
        </Row>
      </div>
    </div>
  )
}