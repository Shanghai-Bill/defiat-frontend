import React from 'react'
import { 
  Card, 
  CardBody,
  Row,
  Col,
  Button,
  Badge
} from 'reactstrap'

export const NewsModule = ({
  title,
  date,
  author,
  categories,
  thumbnail,
  link
}) => {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg="3">
            <img src={thumbnail} className="rounded shadow-lg" height="100" width="220" alt="splash" />
          </Col>
          <Col className="text-left">
            <a className="display-4" href={link}>{title}</a>
            <p>Author: <b>{author}</b></p>
            <p>Published: <b>{date}</b></p>
            <Row className="pl-3">
              {categories && categories.length ? categories.map((category, i) => (
                <Badge key={i} color="primary">{category}</Badge>
              ))
              : (
                <>
                  <Badge color="primary">DeFiat</Badge>
                  <Badge color="primary">DeFi</Badge>
                </>
              )}
            </Row>
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
  )
}