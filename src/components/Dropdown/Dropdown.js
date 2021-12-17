import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

export function Dropdown({
  options,
  callback,
  selectedOption,
  setSelectedOption,
  restProps
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="dropdown"
      tabIndex={0}
      onBlur={(e) => {
        setIsActive(false);
      }}
    >
      <div
        className="dropdown-btn"
        onClick={(e) => {
          setIsActive(!isActive);
        }}
      >
        {selectedOption.label}
        <FaCaretDown />
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
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
