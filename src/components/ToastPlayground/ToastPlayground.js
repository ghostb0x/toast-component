import React from 'react';

import Button from '../Button';
import Toast from '../Toast';
import styles from './ToastPlayground.module.css';
import { useEffect } from 'react';
import ToastShelf from '../ToastShelf/ToastShelf';
import { ToastContext } from '../ToastProvider/ToastProvider';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [currentVariant, setCurrentVariant] =
    React.useState('notice');

  const [message, setMessage] = React.useState('');

  const { createdToasts, createToast } = React.useContext(ToastContext);


  function submitToast(receivedMessage, receivedVariant) {
    createToast(receivedMessage, receivedVariant);
    setMessage('');
    setCurrentVariant('notice');
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img
          alt="Cute toast mascot"
          src="/toast.png"
        />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form
        className={styles.controlsWrapper}
        onSubmit={(event) => {
          event.preventDefault();
          submitToast(message, currentVariant);
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              value={message}
              className={styles.messageInput}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((option) => (
              <label
                htmlFor={`variant-${option}`}
                key={`${option}`}
              >
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name="variant"
                  value={`${option}`}
                  checked={option === currentVariant}
                  onChange={(event) => {
                    setCurrentVariant(event.target.value);
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
