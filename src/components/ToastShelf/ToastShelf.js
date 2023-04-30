import React from 'react';
import styles from './ToastShelf.module.css';
import Toast from '../Toast/Toast';

import { ToastContext } from '../ToastProvider/ToastProvider';

function ToastShelf() {
  const { createdToasts: items } = React.useContext(ToastContext);

  //move toast component definition into displayItems map, to allow
  // modification of hidden attribute

  const displayItems = items.map(
    ({ key, message, messageVariant, hidden }) => {
      const toastComponent = (
        <Toast
          key={key}
          message={message}
          messageVariant={messageVariant}
          hidden={hidden}
        />
      );

      return (
        <li
          key={key}
          className={styles.toastWrapper}
        >
          {toastComponent}
        </li>
      );
    }
  );

  return (
    <ol
      role="region"
      aria-live="polite"
      aria-label="Notification"
      className={styles.wrapper}
    >
      {displayItems}
    </ol>
  );
}

export default ToastShelf;
