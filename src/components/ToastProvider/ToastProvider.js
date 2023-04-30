import React from 'react';
import Toast from '../Toast/Toast';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  // For every toast in createdToasts where hidden=false, set hidden=true.

  const [createdToasts, setCreatedToasts] = React.useState([]);

  const handleDismiss = (React.useCallback =
    (() => {
      const newArray = [...createdToasts];

      newArray.array.forEach((element) => {
        element.hidden = true;
      });
    },
    [createdToasts]));

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        const newArray = [...createdToasts];

        newArray.forEach((element) => {
          element.hidden = true;
        });

        setCreatedToasts(newArray);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
