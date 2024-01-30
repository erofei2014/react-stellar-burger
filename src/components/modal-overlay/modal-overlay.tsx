import React, { type FC } from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

export type TModalOverlay = {
  closeModal: () => void;
};

const ModalOverlay: FC<TModalOverlay> = ({closeModal}) => {
  return (
    <div className={styles.overlay} onClick={closeModal}></div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default ModalOverlay;