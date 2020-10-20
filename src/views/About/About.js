import React from 'react'
import { Container } from 'reactstrap'
import { PageWrapper } from 'components/PageWrapper'
import { AboutCard } from './components/AboutCard'

export const About = () => {
  return (
    <PageWrapper>
      <h2 className="display-2">FAQ</h2>
      <Container>
        <AboutCard
          title="What is DeFiat?"
        >
          <p>
            DeFiat is a new approach of decentralizing finance. It incentivizes users to buy and hold the native token,
            DFT, in return for yield. When a transaction happens on the network, a percentage is taken as a burn
            and another percentage is taken as fee which is used to buy DFT from the market. This creates a sustainable, deflationary
            ecosystem where partcipants are rewarded real yields. With a fully-embedded governance model, the token 
            holders are granted voting power to decide on the direction of the platform. DeFiat wants to expand to serve as
            a "DeFi as a Service" platform.
          </p>
        </AboutCard>
        <AboutCard
          title="What is DeFiat?"
        >
          <p>
            DeFiat is a new approach of decentralizing finance. It incentivizes users to buy and hold the native token,
            DFT, in return for yield. When a transaction happens on the network, a percentage is taken as a burn
            and another percentage is taken as fee which is used to buy DFT from the market. This creates a sustainable, deflationary
            ecosystem where partcipants are rewarded real yields. With a fully-embedded governance model, the token 
            holders are granted voting power to decide on the direction of the platform. DeFiat wants to expand to serve as
            a "DeFi as a Service" platform.
          </p>
        </AboutCard>
        <AboutCard
          title="What is DeFiat?"
        >
          <p>
            DeFiat is a new approach of decentralizing finance. It incentivizes users to buy and hold the native token,
            DFT, in return for yield. When a transaction happens on the network, a percentage is taken as a burn
            and another percentage is taken as fee which is used to buy DFT from the market. This creates a sustainable, deflationary
            ecosystem where partcipants are rewarded real yields. With a fully-embedded governance model, the token 
            holders are granted voting power to decide on the direction of the platform. DeFiat wants to expand to serve as
            a "DeFi as a Service" platform.
          </p>
        </AboutCard>
      </Container>
    </PageWrapper>
  )
}