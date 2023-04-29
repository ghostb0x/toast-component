import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf( {items} ) {

  const displayItems = items.map((item)=> {return (<li key={item.key} className={styles.toastWrapper}>{item.component}</li>)})

  return (
    <ol className={styles.wrapper}>
      {displayItems}
    </ol>
  );
}

export default ToastShelf;
