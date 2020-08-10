import React from 'react'
import {
  Container,
  Button
} from 'reactstrap'
import pdf from 'assets/files/dummy.pdf'

export const WhitepaperSection = () => {
  return (
    <div className="page-header">
      {/* <img
        alt="..."
        className="path"
        src={require("assets/img/path5.png")}
      /> */}
      
      <div className="content-center">
        <Container>
          <h2 className="display-2">About</h2>
          <p>
            DeFiat (DFT) is a fully-governed, deflationary ERC-20 token with a multi-tiered loyalty reward
            system. Every time DFT is transacted, an amount from the transaction is taken for fees and another
            amount is permanately burned; naturally reducing supply over time. Holders of DFT are granted
            proportional voting rights in network decisions, such as setting the burn and fee rates.
            DeFiat's Unified-Staking (UniStake) platform allows users to stake any ERC-20 token in the governance-chosen
            liquidity pools, making your money work for you. Users also gain loyalty points as they use DFT,
            resulting in lower fee and burn rates on DFT transactions.
          </p>
          <br />
          <Button 
            color="primary"
            href={pdf}  
          >
            Read the Whitepaper
          </Button>
        </Container>
      </div>
    </div>
  )
}