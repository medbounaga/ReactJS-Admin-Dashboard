import { useState, useEffect } from 'react';
import styles from '../styles/FormInput.module.scss';

export function Select(props) {
  const {
    id,
    width = '200',
    className = '',
    options,
    onChange,
    label,
    errorMessage,
    value,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={styles['field']}>
      <label className={styles['label']}>{label}</label>
      <select
        id={id}
        onChange={(e) => {
          if (typeof onChange === 'function') {
            onChange(e);
          }
          setInputValue(e.target.value);
        }}
        className={styles['input']}
        {...restProps}
        value={inputValue}
      >
        <option selected disabled hidden>
          Select...
        </option>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className={styles['error']}>{errorMessage}</p>}
    </div>
  );
}
