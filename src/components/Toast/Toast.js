import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';
import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ message, messageVariant, hidden }) {
  let variantStyle = styles[messageVariant];

  const IconName = messageVariant
    ? ICONS_BY_VARIANT[messageVariant]
    : 'Info';

  const [showToast, setShowToast] = React.useState(true);

  return (
    <div
      className={`${showToast ? '' : styles['hidden']} ${
        styles.toast
      } ${variantStyle}`}
    >
      <div className={styles.iconContainer}>
        <IconName size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{messageVariant} - </VisuallyHidden>
        {message}
      </p>
      <button
        aria-label="Dismiss message"
        aria-live="off"
        className={styles.closeButton}
        onClick={() => setShowToast(false)}
      >
        <X size={24} />
        
      </button>
    </div>
  );
}

export default Toast;
