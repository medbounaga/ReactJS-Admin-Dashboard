export const Button = ({
  children,
  callback,
  className = '',
  ...restProps
}) => {
  return (
    <button
      onClick={() => {
        if (typeof callback === 'function') {
          callback();
        }
      }}
      className={`"btn" ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
};
