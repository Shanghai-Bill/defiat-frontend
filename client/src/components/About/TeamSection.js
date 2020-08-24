import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import { TeamCard } from './TeamCard'
import ScrollAnimation from 'react-animate-on-scroll';

export const TeamSection = () => {
  return (
    <section className="section section-lg">
      <img
        alt="..."
        className="bg about-6 floating"
        src={require("assets/img/points.png")}
      />
      <img
        alt="..."
        className="bg about-7 floating"
        src={require("assets/img/burn.png")}
      />

      <Container className="mt-4 text-center content-center">
        <ScrollAnimation animateIn="fadeInUp">
          <h2 className="display-2 text-tertiary">Team</h2>
        </ScrollAnimation>
        
        <ScrollAnimation animateIn="fadeInUp">
          <Row className="justify-content-center">
            <Col lg="8">
            <p>
              The DeFiat team team has over 40 years of industry experience and is compromised of some of the brightest
              minds in blockchain. Since members from our team are actively employed in the industry, the team has chosen
              to stay anonymous due to potential conflicts of interest. Please feel free to reach out to the team through
              Discord or Telegram.
            </p>
            </Col>
          </Row>
        </ScrollAnimation>
        <br />
        <ScrollAnimation animateIn="fadeInLeft">
          <Row>
            <TeamCard
              imageSrc={require('assets/img/clown-pepe.png')}
              cardTitle="Stupid"
              cardSubtitle="Blockchain Developer"
            />
            <TeamCard
              imageSrc={require('assets/img/clown-pepe.png')}
              cardTitle="QuantSoldier"
              cardSubtitle="dApp Developer"
            />
            <TeamCard
              imageSrc={require('assets/img/clown-pepe.png')}
              cardTitle="TetraGraviton"
              cardSubtitle="PM / Developer"
            />
            <TeamCard
              imageSrc={require('assets/img/clown-pepe.png')}
              cardTitle="Mandalf"
              cardSubtitle="Designer"
            />
          </Row>
        </ScrollAnimation>
      </Container>
    </section>
  )
}