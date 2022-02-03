export function validate(values, setValues) {
  let errors = {};

  if (!values.customer) {
    errors.customer = 'Customer name is required';
  }

  if (!values.date) {
    errors.date = 'Date is required';
  }

  if (!values.purchased) {
    errors.purchased = 'Purchased item is required';
  }

  if (!values.total) {
    errors.total = 'Total is required';
  }

  if (!values.status) {
    errors.status = 'Status is required';
  }

  console.log(errors);

  return errors;
}
