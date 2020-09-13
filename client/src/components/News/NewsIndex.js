import React from 'react';
import { Container } from 'reactstrap';
import { NewsModule } from './NewsModule';

export const NewsIndex = ({ mediumPosts }) => {

  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <div className="content">
            <h2 className="display-2">Latest News & Events</h2>
            <Container>
              {mediumPosts.length !== 0 && mediumPosts.map((item, i) => (
                <NewsModule
                  key={i}
                  link={item.link}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  date={item.pubDate}
                  author={item.author}
                  categories={item.categories}
                />
              ))}
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};
