import '../styles/globals.scss';
import styles from '../styles/ConfirmAction.module.scss';
import { Button } from '../components';

export const ConfirmAction = ({
  children,
  handleConfirm,
  closeModalHandler,
}) => {
  return (
    <div className={styles['confirm']}>
      <div className={styles['confirm-question']}>Are you sure?</div>
      <div className={styles['confirm-buttons']}>
        <Button
          color='secondary'
          size='medium'
          variant='outlined'
          onClick={() => {
            closeModalHandler();
            handleConfirm();
          }}
        >
          Yes
        </Button>
        <Button
          color='primary'
          size='medium'
          variant='filled'
          onClick={closeModalHandler}
        >
          No
        </Button>
      </div>
    </div>
  );
};
