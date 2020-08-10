import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Card, 
  CardBody,
  Row,
  Col,
  Container,
  Button
} from 'reactstrap'

export const NewsModule = ({
  title,
  subtitle,
  datePublished,
  imagePath,
  route
}) => {
  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Col lg="2">
              <img src={imagePath} className="rounded shadow-lg" height="100" width="100" />
            </Col>
            <Col className="text-left">
              <a className="display-3" href={route}>{title}</a>
              <p>{subtitle}</p>
              <p className="text-info">{datePublished}</p>
            </Col>
            <Col lg="3" className="d-flex justify-content-center align-items-center">
              <Button
                color="primary"
                href={route}
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