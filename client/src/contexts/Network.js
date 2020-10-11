import React, { createContext, useState } from 'react';
import { UseWalletProvider } from 'use-wallet';

export const Context = createContext({
  network: 1
});

const NetworkProvider = ({ children }) => {
  const [network, setNetwork] = useState(1);

  return (
    <Context.Provider value={{ network }}>
      <UseWalletProvider
        chainId={network}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
        }}
      >
        {children}
      </UseWalletProvider>
    </Context.Provider>
  );
}

export default NetworkProvider;