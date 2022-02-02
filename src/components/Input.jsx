import '../styles/globals.scss';
import styles from '../styles/FormInput.module.scss';
import { useState, useEffect } from 'react';

export const Input = (props) => {
  const { label, onChange, errorMessage, value, ...restProps } = props;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={styles['field']}>
      <label className={styles['label']}>{label}</label>
      <input
        value={inputValue}
        onChange={(e) => {
          if (typeof onChange === 'function') {
            onChange(e);
          }
          setInputValue(e.target.value);
        }}
        className={styles['input']}
        {...restProps}
      ></input>
      {errorMessage && <p className={styles['error']}>{errorMessage}</p>}
    </div>
  );
};
