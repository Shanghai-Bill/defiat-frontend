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
        <ScrollAnimation animateIn="fadeInUp">
          <h2 className="display-2 text-center">Roadmap</h2>
        </ScrollAnimation>
        <Timeline align="alternate">
          <TimelineItem>
            <TimelineOppositeContent>
              <h3>Q3 2020</h3>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                {/* <Icon /> We can put Icons here, but they must be in SVG format */}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ScrollAnimation animateIn="fadeInRight">
                <Card>
                  <CardBody>
                    <CardTitle>Token Launch</CardTitle>
                    <CardText>Launch Token, Points, and Governance Contracts on Ethereum Mainnet</CardText>
                  </CardBody>
                </Card>
              </ScrollAnimation>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <h3>End of Q3 2020</h3>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ScrollAnimation animateIn="fadeInLeft">
                <Card>
                  <CardBody>
                    <CardTitle>Voting Features</CardTitle>
                    <CardText>Implement voting interfaces on dApp and deploy smart contract</CardText>
                  </CardBody>
                </Card>
              </ScrollAnimation>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <h3>Q4 2020</h3>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                {/* <HotelIcon /> */}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ScrollAnimation animateIn="fadeInRight">
                <Card>
                  <CardBody>
                    <CardTitle>DeFi Staking</CardTitle>
                    <CardText>Launch native DFT staking (stake DFT, receive DFT) and the Unified-Staking Protocol (stake any ERC20, receive DFT)</CardText>
                  </CardBody>
                </Card>
              </ScrollAnimation>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <h3>End of Q4 2020</h3>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ScrollAnimation animateIn="fadeInLeft">
                <Card>
                  <CardBody>
                    <CardTitle>DeFi Lending</CardTitle>
                    <CardText>Deploy native DFT lending smart contracts and integrate with dApp</CardText>
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
 
