import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "../styles/Dropdown.module.scss";


export function Dropdown({
  width="200",
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

  return (
    <div
      className={`${styles.dropdown} ${className}`}
      tabIndex={0}
      onBlur={(e) => {
        setIsActive(false);
      }}
      {...restProps}
    >
      {label && (<label className={styles['form-label']}>{label}</label>)}
      <div
        className={styles.dropdownBtn}
        onClick={(e) => {
          setIsActive(!isActive);
        }}
      >
        {selectedOption?.label ? selectedOption.label : "Select..."}
        <MdKeyboardArrowDown />
      </div>
      {isActive && (
        <div className={styles.dropdownContent} style={{minWidth:`${width}px`,maxWidth:`${width}px`}}>
          {options.map((option, index) => (
            <div
              key={index}
              className={option.value === selectedOption.value ? `${styles.dropdownItem} ${styles.active}` : styles.dropdownItem }
              onClick={(e) => {
                if(typeof onChange === "function"){onChange(e)}
                setSelectedOption(Object.assign({}, option));
                setIsActive(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      { errorMessage && <div className={styles['error']}>{errorMessage}</div> }
    </div>
  );
}
