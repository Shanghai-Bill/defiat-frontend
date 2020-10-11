import React from 'react';
import { Row, Col } from 'reactstrap';

export const Loading = ({ type='default' }) => {
  return (
    <div className="content-center">
      <Row className="justify-content-center">
        <Col lg="3">
          <img 
            alt="loading" 
            src={ type === 'farm' ? (
              require("assets/img/Farm-Loading.gif")
            ) : (
              require("assets/img/LoadingScales.gif")
            )} 
          />
        </Col>
      </Row>
    </div>
  )
}
