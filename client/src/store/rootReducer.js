
import { SET_WEB3, SET_ACCOUNTS, SET_CONTRACT_INSTANCE, SET_NETWORK } from './types';
const initialState = {
  web3: {},
  accounts: [],
  contract: {}
};

export default function rootReducer(state = initialState, action) {
  console.log('In offer Reducer', action)
  const { type } = action;
  switch (type) {
    case SET_WEB3: {
      return {
        ...state,
        web3: action.payload.web3,
      };
    }
    case SET_ACCOUNTS: {
      return {
        ...state,
        accounts: action.payload.accounts,
      };
    }
    case SET_CONTRACT_INSTANCE: {
      return {
        ...state,
        contract: action.payload.contract,
      };
    }
    case SET_NETWORK: {
      return {
        ...state,
        network: action.payload.network
      }
    }
    default: {
      return state;
    }
  }
}