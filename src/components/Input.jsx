import '../styles/globals.scss';
import styles from '../styles/FormInput.module.scss';
import { useEffect, useState } from 'react';

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

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  console.log('value');
  console.log(value);

  const iconClasses =
    icon &&
    (iconPosition === 'left'
      ? `${styles['icon-left']} ${styles['has-icon']}`
      : `${styles['icon-right']} ${styles['has-icon']}`);

  return (
    <div className={styles['field']}>
      {label && <label className={styles['label']}>{label}</label>}

      <div className={`${styles['input-wrapper']} ${iconClasses}`}>
        {icon && <div className={styles['icon-wrapper']}>{icon}</div>}
        <input
          onChange={(e) => {
            onChange(e);
            setInputValue(e.target.value);
          }}
          value={inputValue}
          className={styles['input']}
          {...restProps}
        ></input>
      </div>

      {errorMessage && <p className={styles['error']}>{errorMessage}</p>}
    </div>
  );
};
