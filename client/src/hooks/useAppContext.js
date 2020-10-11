import { createContext, useContext } from 'react';

const AppContext = createContext({
  appState: {},
  setAppState: () => null,
  updateAppState: () => null,
});

const useAppContext = () => {
  return useContext(AppContext);
}

export { AppContext, useAppContext };

