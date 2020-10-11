import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import DeFiat from '../defiat';

export const Context = createContext({
  defiat: undefined
});

const DeFiatProvider = ({ children }) => {
  const [defiat, setDeFiat] = useState();
  const { account, ethereum } = useWallet();

  useEffect(() => {
    if (ethereum) {
      const { chainId } = Number(ethereum.chainId);
      const mastermind = new DeFiat(ethereum, chainId, account);
      setDeFiat(mastermind);
    }
  }, [ethereum]);

  return <Context.Provider value={{ defiat }}>{children}</Context.Provider>
}

export default DeFiatProvider;