import {
  BALANCE_INCREASE_ENABLE,
} from './types';

const initialState = {
  offerTransactionRequests: [],
};

export default function offerReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case BALANCE_INCREASE_ENABLE: {
      return {
        ...state,
        balanceEnabled: action.payload.offerEnabled,
      };
    }
    default: {
      return state;
    }
  }
}