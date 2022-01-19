import styles from "./NavBar.module.scss";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (

    
    <div className={styles.header}>
      <div className={styles.logo}><span style={{fontStyle:"italic"}}>Admin</span> Dashboard</div>

      <button
        className={styles.btn}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={isOpen ? styles.menu : `${styles.menu} ${styles.slide}`}>
        <div className={styles.item1}>Home</div>
        <div className={styles.item2}>About</div>
      </div>
    </div>
    
  );
};
