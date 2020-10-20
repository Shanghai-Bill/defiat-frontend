import React from 'react'

export const Legal = () => {
  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path2.png")}
          />
          
          <div className="content-center">
            <h2 className="display-2">Legal</h2>
            <ul className="list-unstyled mt-5">
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div className="icon icon-success mb-2">
                    <i className="tim-icons icon-alert-circle-exc" />
                  </div>
                  <div className="ml-3">
                    <h6 className="text-left">
                      Purchasing DeFiat tokens, like any cryptographic token, involves substantial risk and may lead to loss of 
                      partial or full amount of money invested. You should only buy DFT tokens if you underthe nature of the 
                      tokens and the protocol, and if you accept the inherent risks. </h6>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div className="icon icon-success mb-2">
                    <i className="tim-icons icon-bank" />
                  </div>
                  <div className="ml-3">
                    <h6 className="text-left">
                      You take full responsibility in purchasing DeFiaT on centralized or decentralized exchanges. DeFiaT did not and 
                      will not organize an ICO (Initial Coin Offering). Any purchase, or trading you make that would result in a loss 
                      is your sole responsibility. If you choose to acquire DeFiat, you hereby agree to hold the DeFiat team NOT liable
                      for financial losses, damages or injuries caused to you or any party or individual.
                    </h6>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div className="icon icon-success mb-2">
                    <i className="tim-icons icon-atom" />
                  </div>
                  <div className="ml-3">
                    <h6>
                      Frontend built with <a href="https://demos.creative-tim.com/blk-design-system-react/">BLACK Design System by Creative Tim </a>
                    </h6>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </>
  )
}