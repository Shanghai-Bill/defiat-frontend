import React, { useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useWallet } from 'use-wallet';

export const WalletModal = ({
  onDismiss
}) => {
  const { account, connect } = useWallet();

  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss]);

  return (
    <Modal 
      modalClassName="modal-black"
      //isOpen={isOpen}
      //toggle={handleToggle}
      size="md"
    >
      <ModalHeader ><span className="text-primary display-4">Choose Your Wallet Provider</span></ModalHeader>
      <ModalBody>
        <Button
          color="info"
          className="w-100"
          onClick={() => connect('injected')}
        >

          Metamask
        </Button>
        <Button
          color="info"
          className="w-100"
          onClick={() => connect('walletconnect')}
        >

          WalletConnect
        </Button>
      </ModalBody>
      <ModalFooter className="pt-4">
        <Button color="primary" onClick={onDismiss}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}