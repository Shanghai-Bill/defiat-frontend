import { createContext, } from 'react';

export const Context = createContext({
  
});

const StakingProvider = ({ children }) => {


  return (
    <Context.Provider value={{

    }}>
      {children}
    </Context.Provider>
  )
}

export default StakingProvider;