import { useContext, useMemo } from 'react';
import { Context } from '../contexts/Network';

export const useNetwork = () => {
  const { network } = useContext(Context);

  const isRinkeby = useMemo(() => {
    return network === 4;
  }, [network]);

  const getEtherscanAddress = (address) => {
    let url = 'https://';
    if (isRinkeby) {
      url += 'rinkeby.';
    } 
    return url + "etherscan.io/address/" + address;
  }

  const getUniswapAddress = (address) => {
    return `https://uniswap.info/token/${address}`;
  }

  return {
    network,
    getEtherscanAddress,
    getUniswapAddress
  };
}