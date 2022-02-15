import styles from '../styles/Button.module.scss';
export const Button = ({
  children,
  callback,
  className = '',
  color = 'primary',
  size = 'medium',
  variant = 'filled',
  icon,
  isActive,
  ...restProps
}) => {
  console.log('Button Redender');
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
    <button
      onClick={() => {
        if (typeof callback === 'function') {
          callback();
        }
      }}
      className={`${styles.btn} ${colorClass} ${sizeClass} ${activeClass} ${variantClass} ${className}`}
      {...restProps}
    >
      {icon && <div className={styles['icon-wrapper']}>{icon}</div>}
      <span>{children}</span>
    </button>
  );
};
