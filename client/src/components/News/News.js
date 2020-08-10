import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { NewsIndex } from './NewsIndex'
import { Post } from './Post'
import postData from 'assets/files/posts.json'

export const News = ({match}) => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        <NewsIndex baseUrl={match.url} />
      </Route>
      <Route path={match.url + "/:postId"}>
        <Post />
      </Route>
    </>
  )
}

