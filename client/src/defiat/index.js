export { DeFiat as default } from './DeFiat';

export const getTokenContract = (defiat) => {
  return defiat && defiat.contracts && defiat.contracts.tokenContract;
}

export const getPointsContract = (defiat) => {
  return defiat && defiat.contracts && defiat.contracts.pointsContract;
}

export const getGovContract = (defiat) => {
  return defiat && defiat.contracts && defiat.contracts.govContract;
}