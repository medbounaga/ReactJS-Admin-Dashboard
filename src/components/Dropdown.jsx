import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from '../styles/Dropdown.module.scss';

export function Dropdown({
  width = '200',
  color = 'primary',
  size = 'medium',
  variant = 'filled',
  className = '',
  options,
  onChange,
  label,
  name,
  selectedOption,
  setSelectedOption,
  errorMessage,
  ...restProps
}) {
  const [isActive, setIsActive] = useState(false);

  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return styles['btn-primary'];
      case 'secondary':
        return styles['btn-secondary'];
      default:
        throw Error('Unknown Button Color: ' + color);
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'filled':
        return styles['btn-filled'];
      case 'outlined':
        return styles['btn-outlined'];
      default:
        throw Error('Unknown Button Variant: ' + variant);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'large':
        return styles['btn-lg'];
      case 'small':
        return styles['btn-sm'];
      case 'medium':
        return styles['btn-md'];
      default:
        throw Error('Unknown Button Size: ' + size);
    }
  };

  const colorClass = getColorClass();
  const sizeClass = getSizeClass();
  const variantClass = getVariantClass();
  const activeClass = isActive ? styles.active : '';

  return (
    <div
      className={`${styles['dropdown']} ${className}`}
      tabIndex={0}
      onBlur={(e) => {
        setIsActive(false);
      }}
      {...restProps}
    >
      {label && <label className={styles['form-label']}>{label}</label>}
      <div
        className={`${styles['dropdown-btn']} ${colorClass} ${sizeClass} ${activeClass} ${variantClass} ${className}`}
        onClick={(e) => {
          setIsActive(!isActive);
        }}
      >
        {selectedOption?.label ? selectedOption.label : 'Select...'}
        <MdKeyboardArrowDown />
      </div>
      {isActive && (
        <div
          className={styles['dropdown-content']}
          style={{ minWidth: `${width}px`, maxWidth: `${width}px` }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={
                option.value === selectedOption.value
                  ? `${styles['dropdown-item']} ${styles['active']}`
                  : styles['dropdown-item']
              }
              onClick={(e) => {
                if (typeof onChange === 'function') {
                  onChange(e);
                }
                setSelectedOption(Object.assign({}, option));
                setIsActive(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {errorMessage && <div className={styles['error']}>{errorMessage}</div>}
    </div>
  );
}
