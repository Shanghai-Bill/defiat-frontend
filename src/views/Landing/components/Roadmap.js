import React from 'react'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import { Container } from 'reactstrap'
import ScrollAnimation from 'react-animate-on-scroll'
import { RoadmapItemRight } from './RoadmapItemRight'
import { RoadmapItemLeft } from './RoadmapItemLeft'
 
export const Roadmap = () => {
  return (
    <section className="section section-lg">
      <img
        alt="..."
        className="bg about-3 floating"
        src={require("assets/img/governance.png")}
      />
      <img
        alt="..."
        className="bg about-4 floating"
        src={require("assets/img/governance.png")}
      />

      <Container className="content-center">
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <h2 className="display-2 text-center text-tertiary">Roadmap</h2>
        </ScrollAnimation>
        <Timeline align="alternate">
          <RoadmapItemRight
            date="Aug 2020"
            title="Token & dApp Release"
            text="Launch Token, Points, and Governance Contracts on Ethereum Mainnet alongside dApp"
            releaseDate="08.28.2020"
          />
          <RoadmapItemLeft
            date="Sept 2020"
            title="Native DFT Staking Pools"
            text="Release time-based native staking pools for DFT, DFTP, and DFT-UNI-V2 tokens"
            releaseDate="09.14.2020"
          />
          <RoadmapItemRight
            date="Oct 2020"
            title="DFT Voting Contracts"
            text="Begin decentralized governance protocol by launching voting contracts that work on the DFT network"
            releaseDate="10.04.2020"
          />
          <RoadmapItemLeft
            date="Oct 2020"
            title="Partner Staking Pools"
            text="Release time-based staking pools for other partner ERC20 tokens, starting with XMM"
            releaseDate="10.14.2020"
          />
          <RoadmapItemRight
            date="Oct/Nov 2020"
            title="2ND Chance"
            text="Clean up the DeFi ecosystem by introducing 2ND Chance, the token designed to give your rugged tokens new life"
          />
          <RoadmapItemLeft
            date="Nov 2020"
            title="Upgrade & Decentralize Governance Protocol"
            text="Launch the first governance protocol upgrade for DFT, aimed at reducing the mastermind's central control mechanisms"
          />
          <RoadmapItemRight
            date="Nov/Dec 2020"
            title="AnyStake"
            text="DeFiat's main DeFi offering, AnyStake allows users to stake any ERC20 token and earn yield"
          />
          <RoadmapItemLeft
            date="Dec 2020"
            title="DeFiX Burn Events"
            text="Periodically, community burn events will take place to increase deflationary pressure on DFT"
          />
          <RoadmapItemRight
            date="Dec 2020 and On..."
            title="More Roadmap Items Coming Soon!"
            text="Additional staking pools, DFTP upgrades, website updates, rebranding, & more!"
          />
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent></TimelineContent>
          </TimelineItem>
        </Timeline>
      </Container>
    </section>
  )
}
 
