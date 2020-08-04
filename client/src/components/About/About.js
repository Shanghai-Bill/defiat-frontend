import React from 'react'

import {
  Container,
  Row
} from 'reactstrap'
import { TeamCard } from './TeamCard'
import clown from 'assets/img/clown-pepe.png'

export const About = () => {
  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path5.png")}
          />
          
          <div className="content">
            <Container>
              <h2 classname="display-2">About Us</h2>
              <p>
                We are a diverse group of individuals seeking to make the crypto community a better space. 
                We seek to disrupt traditional finance techonologies by leveraging the power of the Ethereum  
                blockchain and some of the latest DeFi functionalities. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi. Lorem ipsum dolor sit amet, consectetur adipiscing.
              </p>
            </Container>
            <Container className="mt-4">
              <h2 classname="display-2">The Team</h2>
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
          </div>
        </div>
      </div>
    </>
  )
}