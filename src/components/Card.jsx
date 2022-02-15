import styles from '../styles/Card.module.scss';

export function Card({ children, className, disableShadow, ...restProps }) {
  const shadowClass = disableShadow ? styles['no-shadow'] : '';
  return (
    <div
      className={`${styles.card} ${shadowClass} ${className}`}
      {...restProps}
    >
      <div className={styles.cardInner}>{children}</div>
    </div>
  );
}

Card.Header = function CardHeader({ title, children, ...restProps }) {
  return (
    <header className={styles.cardHeader} {...restProps}>
      {children}
    </header>
  );
};

Card.Footer = function CardFooter({ title, children, ...restProps }) {
  return (
    <div className={styles.cardFooter} {...restProps}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ title, ...restProps }) {
  return (
    <h3 className={styles.cardTitle} {...restProps}>
      {title}
    </h3>
  );
};

Card.Body = function CardBody({ children, ...restProps }) {
  return (
    <div className={styles.cardBody} {...restProps}>
      {children}
    </div>
  );
};
