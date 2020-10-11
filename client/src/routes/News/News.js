import React from 'react';
import { Container } from 'reactstrap';
import { NewsModule } from './NewsModule';
import { Loading } from 'components';
import useNews from '../../hooks/useNews';
 
export const News = () => {
  const [ mediumPosts ] = useNews();

  return (
    <div className="wrapper">
        <div className="page-header">
          <div className="content">
          {!mediumPosts ? (
            <Loading />
          ) : (
            <>
              
              <Container>
                <h2 className="display-2">Latest News & Events</h2>
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
            </>
          )}
          </div>
        </div>
    </div>
  );
};
