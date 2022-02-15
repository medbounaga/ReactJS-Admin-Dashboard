import { useState, useEffect } from 'react';

export const useForm = (callback, validate, defaultValues = {}) => {
  const [values, setValues] = useState(defaultValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log('callback');
      callback();
    }
  }, [errors, isSubmitting, callback]);

  const handleSubmit = (event) => {
    console.log('handleSubmit');
    if (event) event.preventDefault();
    setErrors(validate(values, setValues));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    console.log('handleChange');
    console.log(event.target.value);
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    console.log(values);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};
