import React from 'react'
import { Container } from 'reactstrap'
import { NewsModule } from './NewsModule'
import postData from 'assets/files/posts.json'

export const NewsIndex = ({baseUrl}) => {
  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <div className="content">
            <h2 className="display-2">News</h2>
            <Container>
              {postData.reverse().map((post, i) => (
                <NewsModule
                  key={i}
                  title={post.title}
                  subtitle={post.subtitle}
                  datePublished={post.datePublished}
                  author={post.author}
                  imagePath={`${process.env.PUBLIC_URL}/${post.image}`}
                  route={baseUrl + "/" + post.id}
                />
              ))}
            </Container>
          </div>
        </div>
      </div>
    </>
  )
}