import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

function Modal({ children, title, closeModal }) {
  React.useEffect(() => {
    window.addEventListener('keydown', closeOnEsc);

    return () => {
      window.removeEventListener('keydown', closeOnEsc);
    }
  }, [closeModal])

  const closeOnEsc = evt => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.popup_window}>
      <div className={styles.popup_container}>
        <button className={styles.button}><CloseIcon onClick={closeModal} /></button>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;