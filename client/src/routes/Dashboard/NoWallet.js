import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { useModal } from 'hooks/useModal';
import { WalletModal } from 'components';


export const NoWallet = () => {
  const [showWalletModal] = useModal(<WalletModal />);

  return (
    <div className="content-center">
      <Row className="justify-content-center">
        <Col md="3">
        <div className="d-inline-flex align-items-center justify-space-around">
          <img className="mr-2" style={{ height: "50px", width: "50px", marginTop: "0"}} src={require('assets/img/defiat.png')} alt="logo" />
          <h1 className="title m-0">DeFiat</h1>
        </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg="6">
          <Button 
            color="primary"
            onClick={showWalletModal}
          >
            <i className="tim-icons icon-lock-circle" />
            Unlock Wallet
          </Button>
        </Col>
      </Row>     
    </div>
  )
}