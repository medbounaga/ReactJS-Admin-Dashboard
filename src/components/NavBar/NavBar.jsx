import styles from './NavBar.module.scss';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles['nav-bar']}>
      <div className={styles.logo}>Dashboard</div>

      <button
        className={styles.btn}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={isOpen ? styles.menu : `${styles.menu} ${styles.slide}`}>
        <div className={styles['menu-item']}>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to='/'
          >
            Dashboard
          </NavLink>
        </div>
        <div className={styles['menu-item']}>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to='/orders'
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};
