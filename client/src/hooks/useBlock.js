import { useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';

export const useBlock = () => {
  const [block, setBlock] = useState(0);
  const { ethereum } = useWallet();

  useEffect(() => {
    if (!ethereum) {
      return;
    }

    const web3 = new Web3(ethereum);
    const interval = setInterval(async () => {
      const latestBlock = await web3.eth.getBlockNumber();
      if (block !== latestBlock) {
        setBlock(block);
      }
    });
    
    return () => clearInterval(interval);
  }, [ethereum])

  return block;
}