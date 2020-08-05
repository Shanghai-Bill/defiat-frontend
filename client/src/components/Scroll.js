import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

// trigger scroll to top of page when a link is clicked
const Scroll = ({location}) => {
  const [prevLocation, setLocation] = useState('');

  useEffect(() => {
    if (location !== prevLocation) {
      window.scrollTo(0, 0);
      setLocation(location);
    }
  }, [location])

  return <React.Fragment />
}

export default withRouter(Scroll);