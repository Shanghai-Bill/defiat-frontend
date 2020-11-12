export { formatAddress } from './formatAddress'
export { getDisplayBalance, getFullDisplayBalance, getBalanceNumber } from './formatBalance'

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
