import { useState } from 'react';
import styles from "../styles/ButtonGroup.module.scss";
import PropTypes from 'prop-types';


export const ButtonGroup = ({buttons, onClick, restProps}) => {

  const [activeButton, setActiveButton] = useState(-1);

  return (
    <div className={styles.buttonGroup}>
      {buttons.map((btn, id) => (
        <button
          key={id}
          name={btn.value}
          value={btn.value}
          onClick={(event) => {
            event.preventDefault();
            setActiveButton(id);
            onClick(btn.value);
          }}
          className={id === activeButton ? styles.buttonActive : styles.button}
          
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};


