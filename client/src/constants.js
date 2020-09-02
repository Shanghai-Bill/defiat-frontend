export default {
  isLocalhost: window.location.href.indexOf("localhost") > -1, 
  networks: {
    1: {
      name: "main",
      token: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
      points: "0x8c9d8f5CC3427F460e20F63b36992f74AA19e27d",
      gov: "0x3Aa3303877A0D1c360a9FE2693AE9f31087A1381",
      farming: ""
    },
    4: {
      name: "rinkeby",
      token: "0xb571d40e4a7087c1b73ce6a3f29eadfca022c5b2",
      points: "0x70c7d7856e1558210cfbf27b7f17853655752453",
      gov: "0x064fd7d9c228e8a4a2bf247b432a34d6e1cb9442",
      farming: "0x5c2Fed8e40cE254e63Be59553e5188f6398fB195",
      liquidity: "0xd49A73078E9bD0C6A61616900E3f2010D8C80A20",
      pools: [
        {
          img: require("assets/img/defiat-dungeon.png"),
          poolTitle: "DeFiat Dungeon",
          poolSubtitle: "Stake DFT, Earn DFT",
          poolAddress: "0xe11Ac10354e375A3C48330e5c4546B9E6C29f3F8",
          basePool: "0xb571d40e4a7087c1b73ce6a3f29eadfca022c5b2",
          stakedSymbol: "DFT",
          rewardSymbol: "DFT",
          isLiquidityToken: false
        },
        // {
        //   img: require("assets/img/points-palace.png"),
        //   poolTitle: "Points Palace",
        //   poolSubtitle: "Stake DFT, earn DFTP",
        //   poolAddress: "0x5c2Fed8e40cE254e63Be59553e5188f6398fB195",
        //   isLiquidityToken: false
        // },
        {
          img: require("assets/img/liquidity-lab.png"),
          poolTitle: "Liquidity Laboratory",
          poolSubtitle: "Stake DFT-UNI-V2, earn DFT",
          poolAddress: "0x85Ec0832418faff9eF2d69128Cfe86F52d4D4aeF",
          basePool: "0xb571d40e4a7087c1b73ce6a3f29eadfca022c5b2",
          stakedSymbol: "UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
      ]
     }
  },
};
