export default {
  networks: {
    1: {
      name: "main",
      token: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
      points: "0x8c9d8f5CC3427F460e20F63b36992f74AA19e27d",
      gov: "0x3Aa3303877A0D1c360a9FE2693AE9f31087A1381",
      price: "0x86d1d85bb861e13ecb49a396cce1b936307e0fb7",
      weth: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      pools: [
        {
          poolLogo: require("assets/img/defiat-dungeon.png"),
          poolTitle: "DeFiat Dungeon",
          poolSubtitle: "Stake DFT, earn DFT",
          poolAddress: "0xB508Dd7EeD4517bc66462cd384c0849d99B160fc",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "DFT",
          rewardSymbol: "DFT",
          isLiquidityToken: false
        },
        {
          poolLogo: require("assets/img/points-palace.png"),
          poolTitle: "Points Palace",
          poolSubtitle: "Stake DFT, earn DFTP",
          poolAddress: "0x973a2B39F7D59C0E59097f26C0921b60597aFe57",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          rewardAddress: "0x8c9d8f5CC3427F460e20F63b36992f74AA19e27d",
          stakedSymbol: "DFT",
          rewardSymbol: "DFTP",
          isLiquidityToken: false
        },
        {
          poolLogo: require("assets/img/liquidity-lab.png"),
          poolTitle: "Liquidity Laboratory",
          poolSubtitle: "Stake DFT-UNI-V2, earn DFT",
          poolAddress: "0x7BACeF5001203724B1D8b5480dfb7238fcA1375c",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xe2a1d215d03d7e9fa0ed66355c86678561e4940a",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "DFT-UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
      ],
      extendedPools: [],

    },
    4: {
      name: "rinkeby",
      token: "0xb571d40e4a7087c1b73ce6a3f29eadfca022c5b2",
      points: "0x70c7d7856e1558210cfbf27b7f17853655752453",
      gov: "0x064fd7d9c228e8a4a2bf247b432a34d6e1cb9442",
      //gov: "0xfB39a0bBb63bA6e09F305ED97C256B6D75659506",
      price: "0xdbada9b7e7c6334b1a539e8e1a01c4eb3230d095",
      weth: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
      uniFactory: "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f",
      pools: [
        {
          poolLogo: require("assets/img/defiat-dungeon.png"),
          poolTitle: "DeFiat Dungeon",
          poolSubtitle: "Stake DFT, earn DFT",
          poolAddress: "0x39f2cfD89611Ed95D713CFC59A025d939C49Bd44",
          basePool: "0xb571d40e4a7087c1b73ce6a3f29eadfca022c5b2",
          stakedAddress: "0xb571d40e4a7087c1b73ce6a3f29eadfca022c5b2",
          rewardAddress: "0xb571d40e4a7087c1b73ce6a3f29eadfca022c5b2",
          stakedSymbol: "DFT",
          rewardSymbol: "DFT",
          isLiquidityToken: false
        },
        {
          poolLogo: require("assets/img/liquidity-lab.png"),
          poolTitle: "Liquidity Laboratory",
          poolSubtitle: "Stake DFT-UNI-V2, earn DFT",
          poolAddress: "0x98a5750db215633bbff8924b9b569c6fb1215a5a",
          basePool: "0xb571d40e4a7087c1b73ce6a3f29eadfca022c5b2",
          stakedAddress: "0xf7426eacb2b00398d4cefb3e24115c91821d6fb0",
          rewardAddress: "0xb571d40e4a7087c1b73ce6a3f29eadfca022c5b2",
          stakedSymbol: "DFT-UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
      ],
      extendedPools: [
        {
          poolLogo: require("assets/img/xmm-momentum.png"),
          poolTitle: "Momentum Museum",
          poolSubtitle: "Stake XMM-UNI-V2, earn XMM",
          poolAddress: "0xb50Ed58ACee8EA974b432914D2958EC05362C2f7",
          basePool: "0x6be59eebaa63106d69f87390d6446938c5124416",
          stakedAddress: "0x6b909268a513b838b8ab846e60a9297fbec13d95",
          rewardAddress: "0x6be59eebaa63106d69f87390d6446938c5124416",
          stakedSymbol: "XMM-UNI-V2",
          rewardSymbol: "XMM",
          denominator: 1e10,
          isLiquidityToken: true
        },
      ],
      proposals: [
        {
          tag: "DFTG-1",
          proposalName: "Modify Fee & Burn Rate",
          proposalAddress: "0x9f32f8e0943a69f284a9052ef6160826d4299d88",
          choices: [
            {
              name: "Decrease to 0%",
              value: 0
            },
            {
              name: "Remain at 0.10%",
              value: 1
            },
            {
              name: "Increase to 0.50%",
              value: 2
            },
          ]
        },
        // {
        //   tag: "DFTG-2",
        //   proposalName: "Change DFTP Generation Threshold",
        //   proposalAddress: "0x00337f25049e6a1351359a30b10103afe2426b54",
        //   choices: [
        //     {
        //       name: "Decrease to 10 DFT",
        //       value: 0
        //     },
        //     {
        //       name: "Decrease to 50 DFT",
        //       value: 1
        //     },
        //     {
        //       name: "Remain at 100 DFT",
        //       value: 2
        //     },
        //   ]
        // },
      ]
     }
  },
};
