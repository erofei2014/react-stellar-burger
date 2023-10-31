import React from 'react';
import PropTypes from 'prop-types';
import styles from './loader.module.css'

function Loader({ children }) {
  return (
    <div className={styles.loader}>
      {children}
    </div>
  )
}

Loader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element
  ]).isRequired
};

export default Loader;