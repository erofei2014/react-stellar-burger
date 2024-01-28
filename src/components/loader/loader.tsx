import React, { ReactNode} from 'react';
import styles from './loader.module.css';

function Loader({ children }: {children: ReactNode}) {
  return (
    <div className={styles.loader}>
      {children}
    </div>
  )
}

export default Loader;