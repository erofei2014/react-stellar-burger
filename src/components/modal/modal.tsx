import React, { FC, useCallback } from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import { TModalOverlay } from "../modal-overlay/modal-overlay";
import { ChildrenProps } from "../../services/types/types";

export type TModal = TModalOverlay & ChildrenProps;

const modalRoot = document.getElementById('react-modals');

const Modal: FC<TModal> = ({ children, closeModal }: TModal) => {
  const closeOnEsc: (evt: KeyboardEvent) => void = useCallback((evt) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('keydown', closeOnEsc);

    return () => {
      window.removeEventListener('keydown', closeOnEsc);
    }
  }, [closeModal])

  return ReactDOM.createPortal(
    <div className={styles.popup_window}>
      <div className={styles.popup_container}>
        <button className={styles.button}><CloseIcon type='primary' onClick={closeModal} /></button>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </div>,
    modalRoot as HTMLElement
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;