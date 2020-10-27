import BigNumber from 'bignumber.js'

// 2nd 

export const swapFor2ndChance = async (secondChanceContract, ruggedAddress, account, ruggedAmount, ethAmount) => {
  try {
    const result = await secondChanceContract.methods
      .swapfor2NDChance(ruggedAddress, ruggedAmount.toString())
      .send({ 
        from: account,
        value: ethAmount.toString()
      })
      .on('transactionHash', (tx) => tx)
    return result.transactionHash
  } catch (e) {
    console.log(e)
    return false
  }
}

export const get2ndChanceSwapRate = async (secondChanceContract, account, ruggedAddress, amount) => {
  try {
    const result = await secondChanceContract.methods
      .toMint(account, ruggedAddress, amount.toString())
      .call()
    return new BigNumber(result)
  } catch (e) {
    return new BigNumber(0)
  }
}

export const getEthFee = async (secondChanceContract) => {
  try {
    const result = await secondChanceContract.methods
      .viewETHfee()
      .call()
    return new BigNumber(result)
  } catch (e) {
    console.log(e)
    return new BigNumber(0)
  }
}

// export const getMaxBoost = async (secondChanceContract) => {
//   try {
//     const result = await secondChanceContract.methods
//       .maxDFTBoost()
//       .call()
//     return new BigNumber(result)
//   }
// }

// Rug sanctuary

export const deposit = async (rugSanctuaryContract, account, amount) => {
  try {
    const result = await rugSanctuaryContract.methods
      .deposit(0, amount.toString())
      .send({ from: account })
      .on('transactionHash', (tx) => tx)
    return result.transactionHash
  } catch (e) {
    console.log(e)
    return false
  }
}

export const withdraw = async (rugSanctuaryContract, account, amount) => {
  try {
    const result = await rugSanctuaryContract.methods
      .withdraw(0, amount.toString())
      .send({ from: account })
      .on('transactionHash', (tx) => tx)
    return result.transactionHash
  } catch (e) {
    console.log(e)
    return false
  }
}

export const staked = async (rugSanctuaryContract, account) => {
  try {
    const result = await rugSanctuaryContract.methods
      .userInfo(0, account)
      .call()
    return new BigNumber(result.amount)
  } catch (e) {
    return new BigNumber(0)
  }
}

export const pending = async (rugSanctuaryContract, account) => {
  try {
    const result = await rugSanctuaryContract.methods
      .pending(0, account)
      .call()
    return new BigNumber(result)
  } catch (e) {
    console.log(e)
    return new BigNumber(0)
  }
}

export const faucet = async (shitCoinContract, account) => {
  try {
    const result = await shitCoinContract.methods
      .faucet()
      .send({ from: account })
      .on('transactionHash', (tx) => tx)
    return result.transactionHash
  } catch (e) {
    console.log(e)
    return false
  }
}