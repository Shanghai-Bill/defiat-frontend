import { useCallback, useContext, useEffect } from 'react';
import { Context } from '../contexts/News';
import { loadNews } from '../defiat/api';

const useNews = () => {
  const {
    mediumPosts,
    setMediumPosts,
    loading
  } = useContext(Context);

  useEffect(async () => {
      const posts = await loadNews();
      setMediumPosts(posts)
  }, [])

  return [
    mediumPosts,
    loading
  ];
}

export default useNews;