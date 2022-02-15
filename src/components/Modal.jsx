import { useEffect } from 'react';
import styles from '../styles/Modal.module.scss';
import { MdClose } from 'react-icons/md';

export const Modal = ({ children, isOpen, closeModalHandler }) => {
  useEffect(() => {
    document.body.classList.toggle(styles['model-active'], isOpen);

    return () => document.body.classList.remove(styles['model-active']);
  }, [isOpen]);

  return (
    <>
      <div
        className={
          isOpen
            ? `${styles['modal']} ${styles['model-open']}`
            : styles['modal']
        }
      >
        <div className={styles['modal-dialog']}>
          <div className={styles['modal-content']}>
            <div className={styles['modal-header']}>
              <span className={styles['close']} onClick={closeModalHandler}>
                <MdClose />
              </span>
            </div>
            <div className={styles['modal-body']}>{children}</div>
          </div>
        </div>
      </div>
      <div
        onClick={(e) => {
          console.log('backdrop clicked');
          closeModalHandler();
        }}
        className={
          isOpen
            ? `${styles['modal-backdrop']} ${styles['model-open']}`
            : styles['modal-backdrop']
        }
      />
    </>
  );
};
