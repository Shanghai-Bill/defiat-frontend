import React, { useState, useEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { NewsIndex } from './NewsIndex';
import { Post } from './Post';

export const News = ({ match }) => {
  const MEDIUM_URL =
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40defiat&api_key=ezcyzxhvdypvprmcokydvmyzfkvc70xtebllciws&count=6';

  const [mediumPosts, setMediumPosts] = useState([]);

  useEffect(() => {
    fetch(MEDIUM_URL)
      .then((response) => response.json())
      .then((mediumObj) =>
        setMediumPosts({
          mediumPosts: mediumObj,
        })
      );
  }, []);

  let { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        <NewsIndex baseUrl={match.url} mediumPosts={mediumPosts} />
      </Route>
      <Route path={match.url + '/:postId'}>
        <Post />
      </Route>
    </>
  );
};
