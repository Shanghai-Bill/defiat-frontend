import React from 'react'
import defiat_logo from 'assets/img/defiat_dark_500x500.png'

export const DeFiatWebsite = () => {
  return (
    <>
      <img src={defiat_logo} className="rounded shadow-lg" height="200" width="200" />
      <p className="m-4">
        DeFiat has now launched its official website! Here you can find information about
        the DeFiat network, read the whitepaper, and see our latest updates. We will be rolling
        out more features on the website, including dApp integration, in the coming weeks!
        <br/><br/>
        Be sure to join the community in the meantime!
        <br/><br/>
        Discord: <a href="https://discord.gg/fjHpaAr" target="_blank">https://discord.gg/fjHpaAr</a><br/>
        Telegram: <a href="https://t.me/defiat_crypto" target="_blank">https://t.me/defiat_crypto</a><br/>
        Twitter: <a href="https://twitter.com/DeFiatCrypto" target="_blank">https://twitter.com/DeFiatCrypto</a>
      </p>
    </>
  )
}