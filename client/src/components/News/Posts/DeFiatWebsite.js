import React from 'react'
import defiat from 'assets/img/defiat.png'

export const DeFiatWebsite = () => {
  return (
    <>
      {/* <div className="rounded shadow-lg d-flex-inline justify-content-center align-items-center" style={{background: "#221c57", height: "200px", width: "200px"}}> */}
        <img src={defiat} height="200" width="200" alt="logo" />
      {/* </div> */}
      
      <p className="m-4">
        DeFiat has now launched its official website! Here you can find information about
        the DeFiat Ecosystem, read the whitepaper, and see our latest updates. We will be rolling
        out more features on the website, including dApp integration, in the coming weeks!
        <br/><br/>
        Be sure to join the community in the meantime!
        <br/><br/>
        Discord: <a href="https://discord.gg/fjHpaAr" target="_blank" rel="noopener noreferrer">https://discord.gg/fjHpaAr</a><br/>
        Telegram: <a href="https://t.me/defiat_crypto" target="_blank" rel="noopener noreferrer">https://t.me/defiat_crypto</a><br/>
        Twitter: <a href="https://twitter.com/DeFiatCrypto" target="_blank" rel="noopener noreferrer">https://twitter.com/DeFiatCrypto</a>
        Medium: <a href="https://medium.com/@defiat" target="_blank" rel="noopener noreferrer">https://medium.com/@defiat</a>
      </p>
    </>
  )
}