export default {
  networks: {
    1: {
      name: "main",
      token: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
      points: "0x8c9d8f5CC3427F460e20F63b36992f74AA19e27d",
      gov: "0x3Aa3303877A0D1c360a9FE2693AE9f31087A1381",
      price: "0x3fc37DC74BA34b261f95EC44ED6756D6D4D98591",
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
          stakedAddress: "0xe2A1d215d03d7E9Fa0ed66355c86678561e4940a",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "DFT-UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        }
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
        { id: 0, name: 'SantaDAO', symbol: 'HOHO', address: '0x660fDbcebC15a97555CC979f0853454AE65B7f93', decimals: '18' },
        { id: 1, name: 'Eminence', symbol: 'EMN', address: '0x5ade7aE8660293F2ebfcEfaba91d141d72d221e8', decimals: '18' },
        { id: 2, name: 'MYX Network', symbol: 'MYX', address: '0x2129fF6000b95A973236020BCd2b2006B0D8E019', decimals: '18' },
        { id: 3, name: 'BETHERO', symbol: 'HERO', address: '0xB9A1ECcd8324d586B2d95b95Ac75Ea8E6e72154E', decimals: '18' },
        { id: 4, name: 'NEXE Token', symbol: 'NEXE', address: '0xd9F7DEaeB3450cd698FD6d45a7B05A18D84BB1e1', decimals: '18' },
        { id: 5, name: 'CBDAO', symbol: 'CBDAO', address: '0x4639cd8cd52EC1CF2E496a606ce28D8AfB1C792F', decimals: '18' },
        { id: 6, name: 'OnlyUP', symbol: 'ONLYUP', address: '0x58133836f175a629d6A1e100f3f0d849df9aD412', decimals: '18' },
        { id: 7, name: 'HatchDAO', symbol: 'HATCH', address: '0x6F3009663470475F0749A6b76195375f95495fcB', decimals: '18' },
        { id: 8, name: 'yfCyclic', symbol: 'CYCL', address: '0x69f08bd1929ef62ecbe947d6bf76a7b7cdba55e8', decimals: '18' },
        { id: 9, name: 'Debase', symbol: 'DEBASE', address: '0xe20303b4f80ef868f653d1fed3f797b5116c3a2e', decimals: '18' },
        { id: 10, name: 'Synthetic YBDAO', symbol: 'YBREE', address: '0x11f4c6b3e8f50c50935c7889edc56c96f41b5399', decimals: '18' },
        { id: 11, name: 'BlockStake', symbol: 'BLOCK', address: '0x24a1dde6b4f0c144dbe3420f50ec1f5cc56e2d58', decimals: '18' },
        { id: 12, name: 'FOMO Gaming Token', symbol: 'FOMO', address: '0xcc275e3543d42b8a31dcf8ec859f2fbd384b4b57', decimals: '18' },
        { id: 13, name: 'yf12', symbol: 'yf12', address: '0xb1f11700d71164bd755933d96e745617163829fa', decimals: '18' },
        { id: 14, name: 'antiDeFi', symbol: 'aDEFI', address: '0xdc16961915A7704910309173D890B0f5e44c1247', decimals: '0' },
        { id: 15, name: 'ANALYSX', symbol: 'XYS', address: '0x88277055dF2EE38dA159863dA2F56ee0A6909D62', decimals: '6' },
        { id: 16, name: 'NEMOCoin', symbol: 'NEMO', address: '0x957b28f93b0e01557e21e6c564ab26ddc2d18ec5', decimals: '18' },
        { id: 17, name: 'DorayakiToken', symbol: 'DORA', address: '0x59848d60C34dCD2686d7F7918Bd240Fc1890208E', decimals: '18' },
        { id: 18, name: 'Motherbase', symbol: 'MSF', address: '0x0dAF236eb3bCDe380d712B13d1D072c1EEE3Ad98', decimals: '18' },
        { id: 19, name: 'SHARESNFT', symbol: 'SHARE', address: '0xfb48d20fec6f883a4949ca328c9141b88afca428', decimals: '18' },
        { id: 20, name: 'EQUUSMiningToken', symbol: 'EQUUS', address: '0xa462d0e6bb788c7807b1b1c96992ce1f7069e195', decimals: '18' },
        { id: 21, name: 'Hands Of Steel', symbol: 'STEEL', address: '0x6f022e991ea21d26f85f6716c088e2864101dfec', decimals: '0' },
        { id: 22, name: 'KORE', symbol: 'KORE', address: '0x61fb5a2062febc60290b30ab4b93b6d5a71a6d63', decimals: '18' },
        { id: 23, name: 'HEX2T', symbol: 'HEX2T', address: '0xEd1199093b1aBd07a368Dd1C0Cdc77D8517BA2A0', decimals: '18' },
        { id: 24, name: 'MoondustToken', symbol: 'MOONDUST', address: '0x49b16961d006b37e43ea6a943c8c85d5e1d3b8db', decimals: '18' },
        { id: 25, name: 'MOJI Experience Points', symbol: 'MEXP', address: '0xde201daec04ba73166d9917fdf08e1728e270f06', decimals: '18' },
        { id: 26, name: 'YAMI', symbol: 'YAMI', address: '0x6BC6e9468bF2CFfb1A818bbFCc02855e0E4080f3', decimals: '18' },
        { id: 27, name: 'Hikari.Finance', symbol: 'HIKARI', address: '0x064Eb0B52aD9f6b32f95FA29BBdC887dFd33A8Ab', decimals: '18' },
        { id: 28, name: 'YFRay', symbol: 'YFR', address: '0x2b96bf4d483c38d90eb185b996ef6ac48e4b2428', decimals: '18' },
        { id: 29, name: 'lootx.finance', symbol: 'LOOT', address: '0x956fa248d8f3ae8582a60f38a2b8a0ac32adeb5a', decimals: '18' },
        { id: 30, name: 'AntiBooBank', symbol: 'ABOOB', address: '0xcc67c406985088b03190076c6fca4dcc08d8c449', decimals: '18' },
        { id: 31, name: 'PuffCore', symbol: 'PUFF', address: '0x7aa36555bbacd4d937f1768d74c8ebec93ef097f', decimals: '18' },
        { id: 32, name: 'Mystery Token', symbol: 'MYTO', address: '0xBBC47608C2C6E43eeB87E929839FbfB533cA7573', decimals: '18' },
        { id: 33, name: 'luigi.finance', symbol: 'LUIGI', address: '0xa2829832f4a1d9b886a112c2dc87f9f546f69af8', decimals: '18' },
        { id: 34, name: 'AntiYfCoreOrbPriaDefiFarm', symbol: 'fork', address: '0xed7849143BbcE94d039B78bE4d19C24a411BF48e', decimals: '18' },
        { id: 35, name: 'LSD.Travel', symbol: 'LSD', address: '0x231d823778c38783D0608ec9A08A99CFA50B6Cc9', decimals: '18' },
        { id: 36, name: 'CoinOfThePeople', symbol: 'COP', address: '0x40D063D409DE5be4FE6aa45048cE68C7AEc8c152', decimals: '0' },
        { id: 37, name: 'KIMCHI.finance', symbol: 'KIMCHI', address: '0x1E18821E69B9FAA8e6e75DFFe54E7E25754beDa0', decimals: '18' },
        { id: 38, name: 'Honey Farm Finance', symbol: 'HYF', address: '0x016c3d49698bDfa3d58d603A17E5EE31985021a0', decimals: '18' },
        { id: 39, name: 'padthai.finance', symbol: 'PADTHAI', address: '0x6f450f117114075D1D1C91dD64a61C0bA72ca68F', decimals: '18' },
        { id: 40, name: 'XOFI.NETWORK', symbol: 'XOFI', address: '0x5b5AD9F99C96b142E12a8D1F89fd3d2117fd36FF', decimals: '18' },
        { id: 41, name: 'POFI', symbol: 'POFI', address: '0xa420eb11dc020c31e5522a9beb0413e5f0c923ce', decimals: '18' },
        { id: 42, name: 'NOODLE.Finance', symbol: 'NOODLE', address: '0x420ab548b18911717ed7c4ccbf46371ea758458c', decimals: '18' },
        { id: 43, name: 'CREEDV2', symbol: 'CRD', address: '0xba137a98df37b67d5db7e97a2b1cac4272b4e457', decimals: '18' },
      ],
      anystake: [
        {
          poolLogo: require("assets/img/defiat-dungeon.png"),
          poolTitle: "DFT",
          poolSubtitle: "DeFiat Dungeon",
          poolAddress: "0xB508Dd7EeD4517bc66462cd384c0849d99B160fc",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "DFT",
          rewardSymbol: "DFT",
          isLiquidityToken: false
        },
        {
          poolLogo: require("assets/img/liquidity-lab.png"),
          poolTitle: "DFT/ETH LP",
          poolSubtitle: "Liquidity Laboratory",
          poolAddress: "0x7BACeF5001203724B1D8b5480dfb7238fcA1375c",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xe2A1d215d03d7E9Fa0ed66355c86678561e4940a",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "DFT/ETH UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
        {
          poolLogo: require("assets/img/USDC-logo.png"),
          poolTitle: "USDC",
          poolSubtitle: "USD Coin",
          poolAddress: "0x7BACeF5001203724B1D8b5480dfb7238fcA1375c",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xe2a1d215d03d7e9fa0ed66355c86678561e4940a",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "USDC-UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
        {
          poolLogo: require("assets/img/USDT-logo.png"),
          poolTitle: "USDT",
          poolSubtitle: "Tether USD",
          poolAddress: "0x7BACeF5001203724B1D8b5480dfb7238fcA1375c",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xe2a1d215d03d7e9fa0ed66355c86678561e4940a",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "USDT-UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
        {
          poolLogo: require("assets/img/WETH-logo.png"),
          poolTitle: "WETH",
          poolSubtitle: "Wrapped Ether",
          poolAddress: "0xB508Dd7EeD4517bc66462cd384c0849d99B160fc",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "WETH-UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
        {
          poolLogo: require("assets/img/LINK-logo.png"),
          poolTitle: "LINK",
          poolSubtitle: "ChainLink",
          poolAddress: "0x7BACeF5001203724B1D8b5480dfb7238fcA1375c",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xe2a1d215d03d7e9fa0ed66355c86678561e4940a",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "LINK-UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
        {
          poolLogo: require("assets/img/YFI-logo.png"),
          poolTitle: "yFI",
          poolSubtitle: "yearn.finance",
          poolAddress: "0x973a2B39F7D59C0E59097f26C0921b60597aFe57",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          rewardAddress: "0x8c9d8f5CC3427F460e20F63b36992f74AA19e27d",
          stakedSymbol: "YFI-UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
        {
          poolLogo: require("assets/img/UNI-logo.png"),
          poolTitle: "UNI",
          poolSubtitle: "Uniswap",
          poolAddress: "0x7BACeF5001203724B1D8b5480dfb7238fcA1375c",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xe2a1d215d03d7e9fa0ed66355c86678561e4940a",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "UNI-UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
        {
          poolLogo: require("assets/img/aave-logo.png"),
          poolTitle: "AAVE",
          poolSubtitle: "AAVE",
          poolAddress: "0x7BACeF5001203724B1D8b5480dfb7238fcA1375c",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xe2a1d215d03d7e9fa0ed66355c86678561e4940a",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "AAVE-UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
        {
          poolLogo: require("assets/img/syn-logo.png"),
          poolTitle: "SYN",
          poolSubtitle: "Synthetix Network Token",
          poolAddress: "0x7BACeF5001203724B1D8b5480dfb7238fcA1375c",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xe2a1d215d03d7e9fa0ed66355c86678561e4940a",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "SYN-UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
        {
          poolLogo: require("assets/img/marker-logo.png"),
          poolTitle: "MKR",
          poolSubtitle: "Maker DAO",
          poolAddress: "0x7BACeF5001203724B1D8b5480dfb7238fcA1375c",
          basePool: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedAddress: "0xe2a1d215d03d7e9fa0ed66355c86678561e4940a",
          rewardAddress: "0xB6eE603933E024d8d53dDE3faa0bf98fE2a3d6f1",
          stakedSymbol: "MKR-UNI-V2",
          rewardSymbol: "DFT",
          isLiquidityToken: true
        },
      ]
    },
    4: {
      name: "rinkeby",
      token: "0xB571d40e4A7087C1B73ce6a3f29EaDfCA022C5B2",
      points: "0x70c7d7856e1558210cfbf27b7f17853655752453",
      gov: "0x064fd7d9c228e8a4a2bf247b432a34d6e1cb9442",
      //gov: "0xfB39a0bBb63bA6e09F305ED97C256B6D75659506",
      price: "0x73aA8f44dc3e184b602438A6b0CFa80D185DA507",
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
          basePool: "0xB571d40e4A7087C1B73ce6a3f29EaDfCA022C5B2",
          stakedAddress: "0xB571d40e4A7087C1B73ce6a3f29EaDfCA022C5B2",
          rewardAddress: "0xB571d40e4A7087C1B73ce6a3f29EaDfCA022C5B2",
          stakedSymbol: "DFT",
          rewardSymbol: "DFT",
          isLiquidityToken: false
        },
        {
          poolLogo: require("assets/img/liquidity-lab.png"),
          poolTitle: "Liquidity Laboratory",
          poolSubtitle: "Stake DFT-UNI-V2, earn DFT",
          poolAddress: "0x98a5750db215633bbff8924b9b569c6fb1215a5a",
          basePool: "0xB571d40e4A7087C1B73ce6a3f29EaDfCA022C5B2",
          stakedAddress: "0xF7426EAcb2b00398D4cefb3E24115c91821d6fB0",
          rewardAddress: "0xB571d40e4A7087C1B73ce6a3f29EaDfCA022C5B2",
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
      { id: 0, name: 'R_UGGED', symbol: "RUG", address: '0x3Ebbe920B18F5d38bCa5489154388aee2ebE6fF3', decimals: '18' },
      { id: 1, name: 'SHIIIT', symbol: "SHIT", address: '0x4670dC4167f4D80d9597CAecAFED0F529d585589', decimals: '18' },
    ]
  }
};
