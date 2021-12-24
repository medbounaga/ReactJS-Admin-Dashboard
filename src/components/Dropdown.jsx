import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "../styles/Dropdown.module.scss";


export function Dropdown({
  className = '',
  options,
  callback,
  selectedOption,
  setSelectedOption,
  restProps
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`${styles.dropdown} ${className}`}
      tabIndex={0}
      onBlur={(e) => {
        setIsActive(false);
      }}
    >
      <div
        className={styles.dropdownBtn}
        onClick={(e) => {
          setIsActive(!isActive);
        }}
      >
        {selectedOption.label}
        <MdKeyboardArrowDown />
      </div>
      {isActive && (
        <div className={styles.dropdownContent}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={(e) => {
                callback(option.value);
                setSelectedOption(Object.assign({}, option));
                setIsActive(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
