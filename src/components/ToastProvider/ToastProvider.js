import React from 'react';
import Toast from '../Toast/Toast';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [createdToasts, setCreatedToasts] = React.useState([]);

  function createToast(receivedMessage, receivedVariant) {
    const key = crypto.randomUUID();

    const toastComponent = (
      <Toast
        message={receivedMessage}
        messageVariant={receivedVariant}
        key={key}
      />
    );

    const newArray = [...createdToasts];
    newArray.push({
      key: key,
      component: toastComponent,
    });

    setCreatedToasts(newArray);
  }

  const contextValues = {
    createdToasts,
    setCreatedToasts,
    createToast,
  };

  return (
    <ToastContext.Provider value={contextValues}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
