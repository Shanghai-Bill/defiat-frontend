import { useCallback, useMemo } from 'react';
import { BigNumber } from 'bignumber.js';
import { getPointsContract } from '../defiat';
import {
  _discountTranches,
  getDiscountRate,
  updateDiscountOf,
  viewDiscountOf,
  viewEligibilityOf,
} from '../defiat/api';
import { useDeFiat } from './useDeFiat';
import { useBlock } from './useBlock';
import { useTokenBalance } from './useTokenBalance';
import { useWallet } from 'use-wallet';

export const usePoints = () => {

  const defiat = useDeFiat();
  const block = useBlock();
  const { ethereum, chainId, account } = useWallet();

  const pointsBalance = useMemo(() => {
    return useTokenBalance(getPointsContract(defiat));
  }, [account, block, chainId, defiat, ethereum]);

  // discount on 
  const discountRate = useMemo(async () => {
    return await getDiscountRate(getPointsContract(defiat), account);
  }, [account, block, chainId, defiat, ethereum]);
  
  const discountLevel = useMemo(async () => {
    return await viewDiscountOf(getPointsContract(defiat), account) / 10;
  }, [account, block, chainId, defiat, ethereum]);

  const eligibleLevel = useMemo(async () => {
    return await viewEligibilityOf(getPointsContract(defiat), account);
  }, [account, defiat, pointsBalance]);

  const nextLevelPoints = useMemo(async () => {
    const nextLevelPts = await _discountTranches(getPointsContract(defiat), discountLevel+1);
    return new BigNumber(nextLevelPts);
  }, [account, defiat, discountLevel]);

  const checkDiscount = useCallback(async () => {
    if (!!discountLevel && discountLevel < eligibleLevel) {
      return true;
    } else {
      if (!discountLevel) {
        return false;
      } else {
        return nextLevelPoints.sub(pointsBalance)
          .div(new BigNumber(10).pow(18));
      }
    }
  }, [defiat, discountLevel, eligibleLevel, nextLevelPoints, pointsBalance])

  const updateDiscount = useCallback(async () => {
    const shouldUpdate = await checkDiscount();
    if (!shouldUpdate) {
      return;
    }
    const txState = await updateDiscountOf(getPointsContract(defiat), account);
    return txState;
  }, [account, defiat, discountLevel, eligibleLevel, nextLevelPoints, pointsBalance]);

  return {
    discountRate,
    discountLevel,
    pointsBalance,
    checkDiscount,
    updateDiscount
  }
}