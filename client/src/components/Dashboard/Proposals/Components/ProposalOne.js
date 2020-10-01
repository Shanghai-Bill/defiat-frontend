import React from 'react'

export const ProposalOne = () => {
  return (
    <>
      <p className="mt-2">
        The early days of DeFiat have been winding to a close with the 
        release of staking and now a voting interface.
        After seeing the performance of the token over the first month, 
        the development team would like to propose a vote to change the 
        network fee and burn rates.
      </p>
      <br />
      <p>
        This contract will change the DeFiat network transaction fee and burn rate
        on every transaction to the option with the most votes when the decision is activated.
        Anyone can activate the vote on this page once the voting period has expired.
      </p>
      <br />
      <p>
        Voting Power for this contract is equal to the total DFT value of your staked holdings in the DeFiat
        Dungeon, Liquidity Lab, and Points Palace.
      </p>
    </>
  )
}