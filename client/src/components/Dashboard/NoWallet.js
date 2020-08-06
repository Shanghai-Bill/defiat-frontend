import React from 'react';
import logo from 'assets/img/defiat.png'

export const NoWallet = () => {
  return (
    <>
      <div className="d-inline-flex align-items-center justify-space-around">
        <img className="mr-2" width="50" height="50" src={logo} alt="logo" />
        <h1 className="title">DeFiat</h1>
      </div>
      <h3>
        Please connect your Ethereum wallet using the MetaMask Browser
        Extension to access the DeFiat dashboard.
      </h3>
    </>
  )
}