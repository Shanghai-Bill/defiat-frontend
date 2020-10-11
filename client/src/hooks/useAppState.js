import { useState } from 'react';

const useAppState = () => {
  const [appState, setAppState] = useState({});

  // convenience method
  const updateAppState = (stateDelta) => {
    setAppState({
      ...appState,
      ...stateDelta
    })
  }

  return {
    appState,
    setAppState,
    updateAppState
  }
}

export { useAppState };