import React from 'react'
// import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { 
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container
} from 'reactstrap'
import ScrollAnimation from 'react-animate-on-scroll';
 
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
          <TimelineItem>
            <TimelineOppositeContent>
              <h3 className="text-primary">Aug 2020</h3>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                {/* <Icon /> We can put Icons here, but they must be in SVG format */}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ScrollAnimation animateIn="fadeInRight" animateOnce>
                <Card>
                  <CardBody>
                    <CardTitle>Token & dApp Release</CardTitle>
                    <CardText>Launch Token, Points, and Governance Contracts on Ethereum Mainnet alongside dApp</CardText>
                  </CardBody>
                </Card>
              </ScrollAnimation>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <h3 className="text-primary">Sept 2020</h3>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ScrollAnimation animateIn="fadeInLeft" animateOnce>
                <Card>
                  <CardBody>
                    <CardTitle>Voting Contracts</CardTitle>
                    <CardText>All DFT holders will be able to begin voting on proposed changes to the DeFiat Ecosystem.</CardText>
                  </CardBody>
                </Card>
              </ScrollAnimation>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <h3 className="text-primary">Oct 2020</h3>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ScrollAnimation animateIn="fadeInRight" animateOnce>
                <Card>
                  <CardBody>
                    <CardTitle>Decentralize Mastermind Rights</CardTitle>
                    <CardText>The removal of centralized power from the DeFiat Team necessary for achieving complete decentralization.</CardText>
                  </CardBody>
                </Card>
              </ScrollAnimation>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <h3 className="text-primary">Oct 2020</h3>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                {/* <HotelIcon /> */}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ScrollAnimation animateIn="fadeInLeft" animateOnce>
                <Card>
                  <CardBody>
                    <CardTitle>Anystake/Staking</CardTitle>
                    <CardText>Native staking of DFT, as well as the ability to stake any ERC-20 token, will commence.</CardText>
                  </CardBody>
                </Card>
              </ScrollAnimation>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <h3 className="text-primary">Dec 2020</h3>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ScrollAnimation animateIn="fadeInRight" animateOnce>
                <Card>
                  <CardBody>
                    <CardTitle>DeFiX Burn Events</CardTitle>
                    <CardText>Periodically, burn events will be taking place in which various amounts of DFT will be burned.</CardText>
                  </CardBody>
                </Card>
              </ScrollAnimation>
            </TimelineContent>
          </TimelineItem>
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
 
