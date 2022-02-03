import styles from '../styles/Message.module.scss';

export const Message = ({ message }) => {
  return (
    <div className={styles['msg-wrapper']}>
      <span className={styles['msg']}>{message}</span>
    </div>
  );
};
