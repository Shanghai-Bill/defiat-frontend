
import React, { createContext, useCallback, useState } from 'react';

export const Context = createContext({
  onPresent: () => {},
  onDismiss: () => {},
});

const ModalsProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(<></>);
  const [modalKey, setModalKey] = useState();

  const handlePresent = useCallback((modalContent, key=undefined) => {
    setModalKey(key);
    setContent(modalContent);
    setOpen(true);
  }, [setContent, setOpen, setModalKey]);

  const handleDismiss = useCallback(() => {
    setContent(undefined);
    setOpen(false);
  }, [setContent, setOpen, modalKey]);

  return (
    <Context.Provider value={{
      content,
      open,
      onPresent: handlePresent,
      onDismiss: handleDismiss
    }}>
      {children}
      {open && (
        <div>
          {React.isValidElement(content) && React.cloneElement(content)}
        </div>
      )}
    </Context.Provider>
  )
}

export default ModalsProvider;