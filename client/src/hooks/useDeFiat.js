import { useContext } from 'react';
import { Context } from '../contexts/DeFiat';

export const useDeFiat = () => {
  const defiat = useContext(Context);
  return defiat;
}