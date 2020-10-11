
import React, { createContext, useCallback, useState, useEffect } from 'react';
import { useDeFiat} from 'hooks/useDeFiat';
import { useTokenBalance,  } from 'hooks/useTokenBalance';
import { useTotalSupply } from 'hooks/useTotalSupply'
import { usePoints } from 'hooks/usePoints'
import { 
  viewBurnRate,
  viewDiscountOf,
  viewFeeRate
} from '../defiat/api'
import { toast } from 'react-toastify';
import { TooltipMessage } from 'components'

export const Context = createContext({});

const OverviewProvider = ({ children }) => {
  const defiat = useDeFiat();
  
  const tokenBalance = useTokenBalance(defiat.tokenAddress);
  const totalSupply = useTotalSupply(defiat.tokenAddress);
  const { 
    discountRate,
    discountLevel,
    pointsBalance,
    checkDiscount,
    updateDiscount 
  } = usePoints();

  const handleCheckDiscount = useCallback(async () => {
    const eligibility = await checkDiscount();
    if (eligibility === true) {
      toast.success(
        <TooltipMessage 
          title="✅ Success"
          message={`You are eligible for the next Discount Tier.`}
        />
      )
    } else {
      toast.warn(
        <TooltipMessage 
          title="⚠️ Not Eligible" 
          message={`You are not eligible for the next Discount Tier yet. You need ${eligibility} more loyalty points for the next level.`} 
        />
      );
    }
  }, [checkDiscount]);

  const handleUpdateDiscount = useCallback(async () => {
    const txState = await updateDiscount();
    if (!!txState) {
      toast.success(
        <TooltipMessage 
          title="✅ Success"
          message={`Successfully updated discount. You are now Discount Tier ${discountLevel}.`}
        />
      )
    } else {
      toast.error(
        <TooltipMessage
          title="⛔️ Error"
          message="Could not update discount. Check your eligibility and try again."
        />
      );
    }
  });

  return (
    <Context.Provider value={{
      burnRate: '',
      discountRate: discountRate || '',
      feeRate: '',
      pointsBalance: pointsBalance || '',
      tokenBalance: tokenBalance || '',
      totalSupply: totalSupply || '',
      handleCheckDiscount,
      handleUpdateDiscount
    }}>
      {children}
    </Context.Provider>
  )
}

export default OverviewProvider;