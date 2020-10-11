import React from 'react';
import { Link } from 'react-router-dom';

export const NoMatch = () => {
  return (
    <div className="wrapper">
      <div className="page-header">
        <img
          alt="..."
          className="path"
          src={require("assets/img/blob.png")}
        />
        
        <div className="content-center">
          <h1>404 Error</h1>
          <p>The page you are looking for does not exist</p>

          <Link to="/">Go Back Home</Link>
        </div>
      </div>
    </div>
  );
}
