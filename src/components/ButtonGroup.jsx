import { useState } from 'react';
import styles from "../styles/ButtonGroup.module.scss";
import PropTypes from 'prop-types';


export const ButtonGroup = ({buttons, activeButton, setActiveButton,  onClick, restProps}) => {


  return (
    <div className={styles.buttonGroup}>
      {buttons.map((btn, id) => (
        <button
          key={id}
          name={btn.value}
          value={btn.value}
          onClick={(event) => {
            event.preventDefault();
            setActiveButton(Object.assign({}, btn));
            onClick(btn.value);
          }}
          className={btn.value === activeButton.value ? styles.buttonActive : styles.button}
          
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};


