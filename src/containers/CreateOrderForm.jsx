import { Button, Select, Input, DateInput } from '../components';
import { useForm } from '../hooks/useForm';
import { validate } from '../containers/OrderFormValidationRules';
import styles from '../styles/Form.module.scss';

export const CreateOrderForm = ({ createOrder, closeModalHandler }) => {
  const date = new Date();
  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Delivered', label: 'Delivered' },
  ];

  const defaultValues = {
    date: date,
    status: statusOptions[1].value,
  };

  const requestCreateOrder = () => {
    closeModalHandler();
    createOrder(values);
    console.log('createOrder');
    console.log(values.date);
  };

  const { values, handleChange, handleSubmit, errors } = useForm(
    requestCreateOrder,
    validate,
    defaultValues
  );

  const inputs = {
    customer: {
      id: 1,
      name: 'customer',
      type: 'text',
      placeholder: 'Customer',
      errorMessage: errors.customer,
      label: 'Customer Name',
      required: true,
      value: values.customer || '',
    },
    date: {
      id: 2,
      name: 'date',
      errorMessage: errors.date,
      label: 'Date',
      required: true,
      value: values.date || '',
    },
    purchased: {
      id: 3,
      name: 'purchased',
      type: 'text',
      placeholder: 'Purchased',
      errorMessage: errors.purchased,
      label: 'Purchased',
      required: true,
      value: values.purchased || '',
    },
    total: {
      id: 4,
      name: 'total',
      type: 'number',
      placeholder: 'Total',
      errorMessage: errors.total,
      label: 'Total',
      required: true,
      value: values.total || '',
    },
    status: {
      id: 5,
      label: 'Status',
      name: 'status',
      value: values.status || null,
      options: statusOptions,
      errorMessage: errors.status,
    },
  };

  return (
    <form
      className='form'
      autoComplete='off'
      onSubmit={handleSubmit}
      noValidate
    >
      <div className='row'>
        <div className='col col-12'>
          <div className={styles['form-title']}>New Order</div>
        </div>
        <div className='col col-12'>
          <Input {...inputs.customer} onChange={handleChange} />
        </div>
        <div className='col col-6'>
          <DateInput {...inputs.date} onChange={handleChange}></DateInput>
        </div>
        <div className='col col-6'>
          <Input {...inputs.purchased} onChange={handleChange} />
        </div>
        <div className='col col-6'>
          <Input {...inputs.total} onChange={handleChange} />
        </div>
        <div className='col col-6'>
          <Select {...inputs.status} onChange={handleChange} />
        </div>
        <div className='col col-12'>
          <Button>Add Order</Button>
        </div>
      </div>
    </form>
  );
};
