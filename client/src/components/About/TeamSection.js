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
            a better space and enable everyone to take control of their financial situation. Our team has over 
            40 years of industry experience and is compromised of some of the brightest minds in blockchain. 
            Since members from our team are actively employed in the industry, the team has chosen to stay anonymous
            due to potential conflicts of interest. We seek to disrupt traditional finance techonologies by leveraging
            the power of the Ethereum blockchain and introducing unique and lasting DeFi (decentralized finance) solutions. 
          </p>
          </Col>
        </Row>
        <br />
        <Row>
          <TeamCard
            imageSrc={clown}
            cardTitle="Mastermind"
            cardSubtitle="Blockchain Developer"
            cardText="Lorem ipsum dolor si amet color de doloroe. Nes geth bot gjin got him not, for end ipsum dolor."
          />
          <TeamCard
            imageSrc={clown}
            cardTitle="QuantSoldier"
            cardSubtitle="dApp Developer"
            cardText="Lorem ipsum dolor si amet color de doloroe. Nes geth bot gjin got him not, for end ipsum dolor."
          />
          <TeamCard
            imageSrc={clown}
            cardTitle="Member 3"
            cardSubtitle="Product Manager & Developer"
            cardText="Lorem ipsum dolor si amet color de doloroe. Nes geth bot gjin got him not, for end ipsum dolor."
          />
          <TeamCard
            imageSrc={clown}
            cardTitle="Member 4"
            cardSubtitle="Designer"
            cardText="Lorem ipsum dolor si amet color de doloroe. Nes geth bot gjin got him not, for end ipsum dolor."
          />
        </Row>
      </Container>
    </section>
  )
}