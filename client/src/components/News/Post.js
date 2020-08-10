import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Container,
  Card,
  CardBody,
  Button
} from 'reactstrap'
import {
  DeFiatLaunch,
  DeFiatWebsite
} from './Posts'
import postData from 'assets/files/posts.json'

export const Post = () => {
  const { postId } = useParams();

  const postMap = {
    0 : <DeFiatWebsite />,
    1 : <DeFiatLaunch />
  }

  return (
    <>
      <div className="wrapper">
        <div className="page-header">
            <div className="content">
              <Container>
                <div className="d-flex justify-content-start">
                  <Link to="/news">
                    <Button
                      className="btn-link"
                      color="success"
                      size="sm"
                    >
                      <i className="tim-icons icon-minimal-left" />
                    </Button>
                    <p className="category text-success d-inline">
                      Go Back
                    </p>
                  </Link>
                </div>
                <Card>
                  <CardBody>
                    <h2 className="display-2 mb-1">{postData[postId].title}</h2>
                    <p>{postData[postId].subtitle}</p>
                    <p>{postData[postId].datePublished}</p>
                    <br />
                    {postMap[postId]}
                  </CardBody>
                </Card>
              </Container>
            </div>
          </div>
      </div>
    </>
  )
}