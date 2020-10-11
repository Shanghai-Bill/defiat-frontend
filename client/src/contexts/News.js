import React, { createContext, useEffect, useState } from 'react';
import { loadNews } from '../defiat/api';

export const Context = createContext({
  mediumPosts: [],
  setMediumPosts: () => {},
  loading: true
});

const NewsProvider = ({ children }) => {
  const [mediumPosts, setMediumPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (mediumPosts !== []) {
      setLoading(false);
    }
  })

  return (
    <Context.Provider values={{ 
      mediumPosts,
      setMediumPosts,
      loading
    }}>
      {children}
    </Context.Provider>
  )
}

export default NewsProvider;