import '../styles/globals.scss';
import styles from '../styles/ConfirmAction.module.scss';

export const ConfirmAction = ({
  children,
  handleConfirm,
  closeModalHandler,
}) => {
  return (
    <div className={styles['confirm']}>
      <div className={styles['confirm-question']}>Are you sure?</div>
      <div className={styles['confirm-buttons']}>
        <button 
          className='btn btn-secondary btn-md'
          onClick={() => {
            closeModalHandler();
            handleConfirm();      
          }}
        >
          Yes
        </button>
        <button className='btn btn-primary btn-md' onClick={closeModalHandler}>
          No
        </button>
      </div>
    </div>
  );
};
