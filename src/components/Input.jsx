import '../styles/globals.scss';
import styles from '../styles/FormInput.module.scss';
import { useState, useEffect } from 'react';

export const Input = (props) => {
  const {
    label,
    onChange,
    errorMessage,
    value,
    icon = null,
    iconPosition = 'right',
    ...restProps
  } = props;

  const iconClasses =
    icon &&
    (iconPosition === 'left'
      ? `${styles['icon-left']} ${styles['has-icon']}`
      : `${styles['icon-right']} ${styles['has-icon']}`);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={styles['field']}>
      <label className={styles['label']}>{label}</label>

      <div className={`${styles['input-wrapper']} ${iconClasses}`}>
        {icon && <div className={styles['icon-wrapper']}>{icon}</div>}
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
      </div>

      {errorMessage && <p className={styles['error']}>{errorMessage}</p>}
    </div>
  );
};
