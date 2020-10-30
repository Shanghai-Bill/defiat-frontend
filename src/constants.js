export default {
  networks: {
    1: {
      name: "main",
      token: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
      points: "0x8c9d8f5CC3427F460e20F63b36992f74AA19e27d",
      gov: "0x3Aa3303877A0D1c360a9FE2693AE9f31087A1381",
      price: "0x86d1d85bb861e13ecb49a396cce1b936307e0fb7",
      weth: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      uniFactory: "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f",
      second: "0x3084807D124442f21F63212577313de6feb44b47",
      secondLp: "0xdb40c2F4bb5719Fd83160A764a260e88418331ac",
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
      extendedPools: [
        {
          poolLogo: require("assets/img/xmm-momentum.png"),
          poolTitle: "Momentum Museum",
          poolSubtitle: "Stake XMMx, earn XMM",
          poolAddress: "0xfe78ebd1fe6ab976c058a795d9683d85c3929aed",
          basePool: "0x9a7a4c141a3bcce4a31e42c1192ac6add35069b4",
          stakedAddress: "0xb469899812f74ee43bffe2d2022590111da86425",
          rewardAddress: "0x9a7a4c141a3bcce4a31e42c1192ac6add35069b4",
          stakedSymbol: "XMMx",
          rewardSymbol: "XMM",
          denominator: 1e10,
          isLiquidityToken: true
        },
      ],
      proposals: [
        {
          tag: "DFTG-1",
          proposalName: "Modify Fee & Burn Rate",
          proposalAddress: "0x00337f25049e6a1351359a30b10103afe2426b54",
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
        {
          tag: "DFTG-2",
          proposalName: "Change DFTP Generation Threshold",
          proposalAddress: "0xe5eed59bf521b913713e0c9f3779a198591f70f8",
          choices: [
            {
              name: "Decrease to 10 DFT",
              value: 0
            },
            {
              name: "Decrease to 50 DFT",
              value: 1
            },
            {
              name: "Remain at 100 DFT",
              value: 2
            },
          ]
        },
      ],
      secondPool: {
        poolLogo: require("assets/img/sanctuary.png"),
        poolTitle: "Rug Sanctuary",
        poolSubtitle: "Stake 2ND-UNI-V2, Earn 2ND",
        poolAddress: "0x48937F2dd2b0BC8319b996E671978835e0c09685",
        basePool: "0x3084807D124442f21F63212577313de6feb44b47",
        stakedAddress: "0xdb40c2F4bb5719Fd83160A764a260e88418331ac",
        rewardAddress: "0x3084807D124442f21F63212577313de6feb44b47",
        stakedSymbol: "2ND-UNI-V2",
        rewardSymbol: "2ND",
        isLiquidityToken: true
      },
      ruggedCoins: [
        { id: 0, name: 'HOHO', address: '0x660fDbcebC15a97555CC979f0853454AE65B7f93', decimals: '18' },
        { id: 1, name: 'EMN', address: '0x5ade7aE8660293F2ebfcEfaba91d141d72d221e8', decimals: '18' },
        { id: 2, name: 'MYX', address: '0x2129fF6000b95A973236020BCd2b2006B0D8E019', decimals: '18' },
        { id: 3, name: 'HERO', address: '0xB9A1ECcd8324d586B2d95b95Ac75Ea8E6e72154E', decimals: '18' },
        { id: 4, name: 'NUGS', address: '0x25C5fB03fe893381d87cEDA36eBAa57eEA4Ad74d', decimals: '18' },
        { id: 5, name: 'NEXE', address: '0xd9F7DEaeB3450cd698FD6d45a7B05A18D84BB1e1', decimals: '18' },
        { id: 6, name: 'DECORE', address: '0x157D3a0E047400423ae0edf2b4a24447972eAbDb', decimals: '18' },
        { id: 7, name: 'CBDAO', address: '0x4639cd8cd52EC1CF2E496a606ce28D8AfB1C792F', decimals: '18' },
        { id: 8, name: 'ONLYUP', address: '0x58133836f175a629d6A1e100f3f0d849df9aD412', decimals: '18' },
        { id: 9, name: 'HATCH', address: '0x6F3009663470475F0749A6b76195375f95495fcB', decimals: '18' },
        { id: 10, name: 'yCYCL', address: '0x69f08bd1929ef62ecbe947d6bf76a7b7cdba55e8', decimals: '18' },
        { id: 11, name: 'DEBASE', address: '0xe20303b4f80ef868f653d1fed3f797b5116c3a2e', decimals: '18' },
        { id: 12, name: 'YBREE', address: '0x11f4c6b3e8f50c50935c7889edc56c96f41b5399', decimals: '18' },
      ]
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
      second: "0x32d8C1e228b36c87d53b225CaD141f33B6E6E2AC",
      secondLp: "0x2394184FefCFad8D53062A97C59F63Ba1a684489",
      shitcoin: "0x4670dC4167f4D80d9597CAecAFED0F529d585589",
      rugged: "0xe0c7B3Ec3a986Ee518518294DB4193837bF481C2",
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
        }
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
      ],
      secondPool: {
        poolLogo: require("assets/img/sanctuary.png"),
        poolTitle: "Rug Sanctuary",
        poolSubtitle: "Stake 2ND-UNI-V2, Earn 2ND",
        poolAddress: "0xc01DF21d8268eEDB8E72eA6834192480bAB1BD29",
        basePool: "0x32d8C1e228b36c87d53b225CaD141f33B6E6E2AC",
        stakedAddress: "0x2394184FefCFad8D53062A97C59F63Ba1a684489",
        rewardAddress: "0x32d8C1e228b36c87d53b225CaD141f33B6E6E2AC",
        stakedSymbol: "2ND-UNI-V2",
        rewardSymbol: "2ND",
        isLiquidityToken: true
      },
      ruggedCoins: [
        { id: 0, name: 'R_UGGED', address: '0xe0c7B3Ec3a986Ee518518294DB4193837bF481C2', decimals: '18' },
        { id: 1, name: 'SHIIIT', address: '0x4670dC4167f4D80d9597CAecAFED0F529d585589', decimals: '18' },
        
      ]
     }
  },
  5: {
    name: "goerli",
    token: "0xFfF47c1877218b40375391B81965474f6E300459",
    // points: "0x70c7d7856e1558210cfbf27b7f17853655752453",
    // gov: "0x064fd7d9c228e8a4a2bf247b432a34d6e1cb9442",
    // price: "0xdbada9b7e7c6334b1a539e8e1a01c4eb3230d095",
    // weth: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    // uniFactory: "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f",
    second: "0x32d8C1e228b36c87d53b225CaD141f33B6E6E2AC",
    secondLp: "0x2394184FefCFad8D53062A97C59F63Ba1a684489",
    shitcoin: "0x4670dC4167f4D80d9597CAecAFED0F529d585589",
    rugged: "0xe0c7B3Ec3a986Ee518518294DB4193837bF481C2",
    secondPool: {
      poolLogo: require("assets/img/sanctuary.png"),
      poolTitle: "Rug Sanctuary",
      poolSubtitle: "Stake 2ND-UNI-V2, Earn 2ND",
      poolAddress: "0xc01DF21d8268eEDB8E72eA6834192480bAB1BD29",
      basePool: "0x32d8C1e228b36c87d53b225CaD141f33B6E6E2AC",
      stakedAddress: "0x2394184FefCFad8D53062A97C59F63Ba1a684489",
      rewardAddress: "0x32d8C1e228b36c87d53b225CaD141f33B6E6E2AC",
      stakedSymbol: "2ND-UNI-V2",
      rewardSymbol: "2ND",
      isLiquidityToken: true
    },
    ruggedCoins: [
      { id: 0, name: 'R_UGGED', address: '0x3Ebbe920B18F5d38bCa5489154388aee2ebE6fF3', decimals: '18' },
      { id: 1, name: 'SHIIIT', address: '0x4670dC4167f4D80d9597CAecAFED0F529d585589', decimals: '18' },
    ]
  }
};
