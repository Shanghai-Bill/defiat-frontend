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

export const RoadmapItemRight = ({
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
          <Row className="d-flex align-items-baseline justify-content-end">
            <p className="text-tertiary">Released on {releaseDate} &nbsp;</p>
            <MdCheck style={{fontSize: 14}} />
          </Row>
        )}
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
              <CardTitle>{title}</CardTitle>
              <CardText>{text}</CardText>
            </CardBody>
          </Card>
        </ScrollAnimation>
      </TimelineContent>
    </TimelineItem>
  )
}
