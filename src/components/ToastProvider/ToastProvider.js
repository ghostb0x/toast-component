import React from 'react';
import useEscapeKey from '../../hooks/useEscapeKey';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  // For every toast in createdToasts where hidden=false, set hidden=true.

  const [createdToasts, setCreatedToasts] = React.useState([]);

  //create new toast and push to createdToasts array
  function createToast(receivedMessage, receivedVariant) {
    const key = crypto.randomUUID();

    const newArray = [...createdToasts];
    newArray.push({
      key: key,
      message: receivedMessage,
      messageVariant: receivedVariant,
      hidden: false,
    });

    setCreatedToasts(newArray);
  }

  // escape key wipes all createdToasts
  const handleEscape = React.useCallback(() => {
    setCreatedToasts([]);
  }, []);

  //feed memoized callback to custom hook useEscapeKey
  useEscapeKey(handleEscape);

  const contextValues = {
    createdToasts,
    createToast,
  };

  return (
    <ToastContext.Provider value={contextValues}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
