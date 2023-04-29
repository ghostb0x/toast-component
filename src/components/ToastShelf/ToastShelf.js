import React from 'react';
import styles from './ToastShelf.module.css';

import { ToastContext } from '../ToastProvider/ToastProvider';

function ToastShelf() {

  const { createdToasts: items } = React.useContext(ToastContext)

  const displayItems = items.map((item)=> {return (<li key={item.key} className={styles.toastWrapper}>{item.component}</li>)})

  return (
    <ol className={styles.wrapper}>
      {displayItems}
    </ol>
  );
}

export default ToastShelf;
