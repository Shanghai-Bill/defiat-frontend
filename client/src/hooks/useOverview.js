import { useContext } from 'react';
import { Context } from '../contexts/Overview';

export const useOverview = () => {
  const {
    burnRate,
    discountRate,
    feeRate,
    pointsBalance,
    tokenBalance,
    totalSupply,
    handleCheckDiscount,
    handleUpdateDiscount
  } = useContext(Context);


  return {
    burnRate,
    discountRate,
    feeRate,
    pointsBalance,
    tokenBalance,
    totalSupply,
    handleCheckDiscount,
    handleUpdateDiscount
  }
}