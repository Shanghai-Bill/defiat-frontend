import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import { TeamCard } from './TeamCard'
import clown from 'assets/img/clown-pepe.png'

export const TeamSection = () => {
  return (
    <section className="section section-lg">
      <Container className="mt-4 text-center content-center">
        <h2 className="display-2">Team</h2>
        <Row className="justify-content-center">
          <Col lg="8">
          <p>
            The DeFiat team is a diverse group of individuals simply seeking to make the crypto community 
            a better space and enable everyone to take control of their financial situation. We seek to disrupt
            traditional finance techonologies by leveraging the power of the Ethereum blockchain and introducing
            unique and lasting DeFi (decentralized finance) solutions. Our team has over 40 years of industry
            experience and is compromised of some of the brightest minds in blockchain.
          </p>
          </Col>
        </Row>
        <br />
        <Row>
          <TeamCard
            imageSrc={clown}
            cardTitle="Member 1"
            cardSubtitle="Le Mastermind"
            cardText="Lorem ipsum dolor si amet color de doloroe. Nes geth bot gjin got him not, for end ipsum dolor."
          />
          <TeamCard
            imageSrc={clown}
            cardTitle="Member 2"
            cardSubtitle="Memeologist"
            cardText="Lorem ipsum dolor si amet color de doloroe. Nes geth bot gjin got him not, for end ipsum dolor."
          />
          <TeamCard
            imageSrc={clown}
            cardTitle="Member 3"
            cardSubtitle="Holder of Bags"
            cardText="Lorem ipsum dolor si amet color de doloroe. Nes geth bot gjin got him not, for end ipsum dolor."
          />
          <TeamCard
            imageSrc={clown}
            cardTitle="Member 4"
            cardSubtitle="Presidente de Shill"
            cardText="Lorem ipsum dolor si amet color de doloroe. Nes geth bot gjin got him not, for end ipsum dolor."
          />
        </Row>
      </Container>
    </section>
  )
}