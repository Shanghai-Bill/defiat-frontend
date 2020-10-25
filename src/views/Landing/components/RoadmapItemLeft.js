import React from 'react'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import { Card, CardBody, CardTitle, CardText, Row } from 'reactstrap'
import ScrollAnimation from 'react-animate-on-scroll'
import { MdCheck } from 'react-icons/md'

export const RoadmapItemLeft = ({
  date,
  title,
  text,
  releaseDate = undefined
}) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent>
        <h3 className="text-primary">{date}</h3>
        {releaseDate && (
          <Row className="d-flex align-items-baseline">
            <MdCheck style={{fontSize: 14}} />
            <p className="text-tertiary">&nbsp; Released on {releaseDate}</p>
          </Row>
        )}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="primary" />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <ScrollAnimation animateIn="fadeInLeft" animateOnce>
          <Card>
            <CardBody>
              <CardTitle>{title}</CardTitle>
              <CardText>{text}</CardText>
            </CardBody>
          </Card>
        </ScrollAnimation>
      </TimelineContent>
    </TimelineItem>
  )
}
