import React from 'react'
import {
  Container,
  Button
} from 'reactstrap'
import ScrollAnimation from 'react-animate-on-scroll';
import pdf from 'assets/files/DFT-DeFiat-Whitepaper.pdf'

export const WhitepaperSection = () => {
  return (
    <div className="page-header">
      <img
        alt="..."
        className="bg about-1 floating"
        src={require("assets/img/defiat.png")}
      />
      <img
        alt="..."
        className="bg about-2 floating"
        src={require("assets/img/defiat.png")}
      />
      
      <div className="content-center">
        <Container>
          <ScrollAnimation animateIn="fadeInRight">
            <h2 className="display-2 text-primary">About</h2>
            <p className="text-lg">
              DeFiat (DFT) is a fully-governed, deflationary ERC-20 token with a multi-tiered loyalty reward
              system. Every time DFT is transacted, an amount from the transaction is taken for fees and another
              amount is permanently burned; naturally reducing supply over time. Holders of DFT are granted
              proportional voting rights in network decisions, such as setting the burn and fee rates.
              DeFiat's AnyStake platform allows users to stake any ERC-20 token in the governance-chosen
              liquidity pools, making your money work for you. Users also gain loyalty points, in the form of DFTP, as they 
              interact with the DeFiat ecosystem, resulting in lower fee and burn rates on DFT transactions.
            </p>
            <br />
            <Button 
              color="primary"
              href={pdf}  
            >
              Read the Whitepaper
            </Button>
          </ScrollAnimation>
        </Container>
      </div>
    </div>
  )
}