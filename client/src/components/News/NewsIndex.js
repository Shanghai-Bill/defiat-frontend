import React from 'react';
import { Container } from 'reactstrap';
import { NewsModule } from './NewsModule';

export const NewsIndex = ({ mediumPosts }) => {

  const returnMediumPosts = () => {
    if(mediumPosts.length !== 0){
      return(
        mediumPosts.mediumPosts.items.map((item) => (
          <NewsModule
            link={item.link}
            thumbnail={item.thumbnail}
            title={item.title}
            description={item.description}
            author={item.author}
            date={item.pubDate}
            key={item.title}
          />
        ))
      )
    }
  }

  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <div className="content">
            <h2 className="display-2">Latest News & Events</h2>
            <Container>
            {returnMediumPosts()}
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};
