import React from 'react';

import Button from '../Button';
import Toast from '../Toast';
import styles from './ToastPlayground.module.css';
import { useEffect } from 'react';
import ToastShelf from '../ToastShelf/ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [currentVariant, setCurrentVariant] =
    React.useState('notice');

  const [message, setMessage] = React.useState('');

  const [createdToasts, setCreatedToasts] = React.useState([]);

  React.useEffect(() => {
    console.log(`Message is ${message}`);
    console.log(`Variant is ${currentVariant}`);
    console.log(
      `Num of currently created toasts: ${createdToasts.length}`
    );
  }, [message, currentVariant, createdToasts]);

  function createToast(receivedMessage, receivedVariant) {
    const key = crypto.randomUUID();

    const toastComponent = (
      <Toast
        message={receivedMessage}
        messageVariant={receivedVariant}
        key={key}
      />
    );

    const newArray = createdToasts;
    newArray.push({
      key: key,
      component: toastComponent,
    });

    setCreatedToasts(newArray);

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

      <ToastShelf items={createdToasts} />

      <form onSubmit={event => event.preventDefault()}>
        <div className={styles.controlsWrapper}>
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
              <Button
                onClick={() => {
                  console.log('clicked!');
                  createToast(message, currentVariant);
                }}
              >
                Pop Toast!
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
