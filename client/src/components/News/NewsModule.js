import React from 'react'
import { 
  Card, 
  CardBody,
  Row,
  Col,
  Button
} from 'reactstrap'

export const NewsModule = ({
  title,
  subtitle,
  datePublished,
  thumbnail,
  link
}) => {
  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Col lg="3">
              <img src={thumbnail} className="rounded shadow-lg" height="100" width="220" alt="splash" />
            </Col>
            <Col className="text-left">
              <a className="display-3" href={link}>{title}</a>
              <p>{subtitle}</p>
              <p className="text-info">{datePublished}</p>
            </Col>
            <Col lg="3" className="d-flex justify-content-center align-items-center">
              <Button
                color="primary"
                href={link}
              >
                Read More
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}