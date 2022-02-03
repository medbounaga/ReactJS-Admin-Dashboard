import '../styles/globals.scss';
import styles from '../styles/Form.module.scss';

export const ViewOrder = ({ order }) => {

  const Status = {
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
    PENDING: 'Pending',
    ALL: 'All',
  };
  
  const getStatusClassName = (status) => {
    switch (status) {
      case Status.DELIVERED:
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
          <div className={styles['form-title']}>Order Details</div>
        </div>
        <div className='col col-12'>
          <label className={styles['form-label']}>Order</label>
          <div className={styles['form-text']}>{order.orderId}</div>
        </div>
        <div className='col col-12'>
          <label className={styles['form-label']}>Date</label>
          <div className={styles['form-text']}>{order.date}</div>
        </div>
        <div className='col col-12'>
          <label className={styles['form-label']}>Customer</label>
          <div className={styles['form-text']}>{order.customer}</div>
        </div>
        <div className='col col-12'>
          <label className={styles['form-label']}>Purchased</label>
          <div className={styles['form-text']}>{order.purchased}</div>
        </div>
        <div className='col col-12'>
          <label className={styles['form-label']}>Total</label>
          <div className={styles['form-text']}>{order.total}</div>
        </div>
        <div className='col col-12'>
          <label className={styles['form-label']}>Status</label>
          <div className={getStatusClassName(order.status)}>{order.status}</div>
        </div>
      </div>
    </div>
  );
};
