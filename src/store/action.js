import { SET_WEB3, SET_ACCOUNTS, SET_CONTRACT_INSTANCE, SET_NETWORK } from './types';

export const setWeb3State = (payload) => ({
  type: SET_WEB3,
  payload,
});
export const setAccountsState = (payload) => ({
  type: SET_ACCOUNTS,
  payload,
});
export const setContractState = (payload) => ({
  type: SET_CONTRACT_INSTANCE,
  payload,
});
export const setNetworkState = (payload) => ({
  type: SET_NETWORK,
  payload
})
