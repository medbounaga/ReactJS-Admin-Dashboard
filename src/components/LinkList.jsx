import { Children, cloneElement } from 'react';
import { useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import styles from '../styles/LinkList.module.scss';

export const LinkList = ({ children, ...restProps }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={
        isActive
          ? `${styles['linkList']} ${styles['active']}`
          : `${styles['linkList']}`
      }
      tabIndex={0}
      onBlur={(e) => {
        setIsActive(false);
      }}
      {...restProps}
    >
      <div
        className={styles['linkList-btn']}
        onClick={(e) => {
          setIsActive(!isActive);
        }}
      >
        <MdMoreHoriz />
      </div>
      <div className={styles['linkList-content']}>
        {Children.map(children, (child) => {
          return cloneElement(child, { setIsActive });
        })}
      </div>
    </div>
  );
};

LinkList.Item = ({ title, icon, callback, setIsActive }) => {
  return (
    <div
      className={styles['linkList-item']}
      onClick={() => {
        callback();
        setIsActive(false);
      }}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  
  
  );
};
