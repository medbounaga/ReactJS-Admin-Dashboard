import '../styles/globals.scss';
import styles from '../styles/FormInput.module.scss';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateInput = (props) => {
  const { label, onChange, errorMessage, value, ...restProps } = props;

  const [inputValue, setInputValue] = useState(new Date());

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={styles['field']}>
      <label className={styles['label']}>{label}</label>
      <DatePicker
        onChangeRaw={(e) => {
          if (typeof onChange === 'function') {
            onChange(e);
          }
        }}
        onChange={(date) => setInputValue(date)}
        selected={inputValue}
        className={styles['input']}
        {...restProps}
      ></DatePicker>
      {errorMessage && <p className={styles['error']}>{errorMessage}</p>}
    </div>
  );
};
