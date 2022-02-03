import '../styles/globals.scss';
import styles from '../styles/Form.module.scss';

export const ViewTransaction = ({ transaction }) => {

  const Status = {
    PAID: 'Paid',
    CANCELLED: 'Cancelled',
    PENDING: 'Pending',
    ALL: 'All',
  };
  
  const getStatusClassName = (status) => {
    switch (status) {
      case Status.PAID:
        return 'badge green';

      case Status.PENDING:
        return 'badge orange';

      case Status.CANCELLED:
        return 'badge red';

      default:
        return undefined;
    }
  };
  return (
    <div>
        
      <div className='row'>
        <div className='col col-12'>
          <div className={styles['form-title']}>Transaction Details</div>
        </div>
        <div className='col col-12'>
          <label className={styles['form-label']}>Order N.</label>
          <div className={styles['form-text']}>{transaction.orderNo}</div>
        </div>
        <div className='col col-12'>
          <label className={styles['form-label']}>Date</label>
          <div className={styles['form-text']}>{transaction.date}</div>
        </div>
        <div className='col col-12'>
          <label className={styles['form-label']}>Customer</label>
          <div className={styles['form-text']}>{transaction.customer}</div>
        </div>
        <div className='col col-12'>
          <label className={styles['form-label']}>Amount</label>
          <div className={styles['form-text']}>{transaction.amount}</div>
        </div>
        <div className='col col-12'>
          <label className={styles['form-label']}>Status</label>
          <div className={getStatusClassName(transaction.status)}>{transaction.status}</div>
        </div>
      </div>
    </div>
  );
};
