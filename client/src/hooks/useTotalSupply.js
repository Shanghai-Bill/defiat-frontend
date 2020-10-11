import { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useWallet } from 'use-wallet';
import { getTotalSupply } from '../defiat/api';
import { useBlock } from './useBlock';

export const useTotalSupply = (tokenAddress) => {
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0));
  const { account, ethereum }= useWallet();
  const block = useBlock();

  const fetchTotalSupply = useCallback(async () => {
    const totalSupply = await getTotalSupply(ethereum, tokenAddress);
    setTotalSupply(new BigNumber(totalSupply))
  }, [account, ethereum, tokenAddress]);

  useEffect(() => {
    if (account && ethereum) {
      fetchTotalSupply();
    }
  }, [account, ethereum, setTotalSupply, block, tokenAddress]);

  return totalSupply;
}