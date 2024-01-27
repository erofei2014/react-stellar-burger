import React, { FC} from 'react';
import styles from './loader.module.css';
import { ChildrenProps } from '../../services/types/types';

function Loader({ children }: ChildrenProps) {
  return (
    <div className={styles.loader}>
      {children}
    </div>
  )
}

export default Loader;