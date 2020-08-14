import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { NewsIndex } from './NewsIndex'
import { Post } from './Post'

export const News = ({match}) => {
  let { path } = useRouteMatch();

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

