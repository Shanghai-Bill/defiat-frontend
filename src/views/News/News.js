import React, { useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import { PageWrapper } from 'components/PageWrapper'
import { Loading } from 'components/Loading'
import { NewsModule } from './components/NewsModule'

export const News = () => {
  const MEDIUM_URL =
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40defiat&api_key=ezcyzxhvdypvprmcokydvmyzfkvc70xtebllciws&count=6';

  const [mediumPosts, setMediumPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(MEDIUM_URL)
      .then((response) => response.json())
      .then((mediumObj) => {
        setMediumPosts(mediumObj.items)
        setLoading(false)
      });
  }, []);

  return (
    <PageWrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </PageWrapper>
  );
};
