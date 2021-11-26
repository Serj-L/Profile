import { FC, ReactNode, useEffect } from 'react';

import styles from './Modal.module.css';

interface ModalProps {
  isModalActive: boolean;
  modalTitle?: string;
  closeModalHandler: () => void;
  children?: ReactNode
  isAccent?: boolean,
}

const Modal: FC<ModalProps> = ({
  isModalActive,
  modalTitle = 'Modal window',
  closeModalHandler,
  children = null,
  isAccent = false,
}) => {

  useEffect(() => {
    isModalActive ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto';
  }, [isModalActive]);

  return isModalActive ?
    (
      <div className={styles.modalWrapper}>
        <div
          className={styles.modal}
          data-is-accent={isAccent}
        >
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>{modalTitle}</h3>
            <button
              className={styles.btnClose}
              onClick = {closeModalHandler}
            >
              &times;
            </button>
          </div>
          <div className={styles.modalContent}>
            {children}
          </div>
        </div>
        <div
          className={styles.modalLayout}
          onClick = {closeModalHandler}
        >
        </div>
      </div>
    ) : null;
};

export default Modal;
