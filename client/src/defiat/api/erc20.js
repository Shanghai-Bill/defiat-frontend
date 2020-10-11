import Web3 from 'web3';

export const getContract = (provider, address) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(address);
  return contract;
}

export const getAllowance = async (tokenContract, spenderContract, account) => {
  try {
    const allowance = await tokenContract.methods
      .allowance(account, spenderContract)
      .call();
    return allowance;
  } catch (e) {
    return '0';
  }
}

export const getBalance = async (provider, tokenAddress, userAddress) => {
  const tokenContract = getContract(provider, tokenAddress);
  try {
    const balance = await tokenContract.methods
      .balanceOf(userAddress)
      .call();
    return balance;
  } catch (e) {
    return '0';
  }
}

export const getTotalSupply = async (provider, tokenAddress) => {
  const tokenContract = getContract(provider, tokenAddress);
  try {
    const totalSupply = await tokenContract.methods
      .totalSupply()
      .call();
    return totalSupply;
  } catch (e) {
    return '0';
  }
}