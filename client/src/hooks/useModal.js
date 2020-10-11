import { useCallback, useContext } from 'react'
import { Context } from '../contexts/Modals'

export const useModal = (modal, key=undefined) => {
  const { onDismiss, onPresent } = useContext(Context);

  const handlePresent = useCallback(() => {
    onPresent(modal, key);
  }, [key, modal, onPresent]);

  return [handlePresent, onDismiss];
}
