import BigNumber from 'bignumber.js'
import { ethers} from 'ethers'
import ERC20 from 'contracts/_ERC20.json'

export const getTokenContract = (web3, tokenAddress) => {
  return new web3.eth.Contract(ERC20.abi, tokenAddress)
}

export const getTokenBalance = async (tokenContract, account) => {
  try {
    const result = await tokenContract.methods
      .balanceOf(account)
      .call()
    return new BigNumber(result)
  } catch (e) {
    //console.log(e)
    return new BigNumber(0)
  }
}

export const getAllowance = async (tokenContract, account, spenderAddress) => {
  try {
    const result = await tokenContract.methods
      .allowance(account, spenderAddress)
      .call()
    return new BigNumber(result)
  } catch (e) {
    //console.log(e)
    return new BigNumber(0)
  }
}

export const getTotalSupply = async (tokenContract) => {
  try {
    const result = await tokenContract.methods
      .totalSupply()
      .call()
    return new BigNumber(result)
  } catch (e) {
    //console.log(e)
    return new BigNumber(0)
  }
}

export const approve = async (tokenContract, spenderAddress, account) => {
  try {
    const maxInt = ethers.constants.MaxUint256.toString()

    const result = await tokenContract.methods
      .approve(spenderAddress, maxInt)
      .send({ from: account })
      .on('transactionHash', (tx) => tx)
    return result.transactionHash
  } catch (e) {
    //console.log(e)
    return 0
  }
}