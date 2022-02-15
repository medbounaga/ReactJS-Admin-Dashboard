import { useState, useEffect } from 'react';
import styles from '../styles/ButtonGroup.module.scss';
import { Button } from './Button';

export const ButtonGroup = ({
  buttons,
  activeButton,
  variant,
  size,
  color,
  onClick,
  ...restProps
}) => {
  console.log('ButtonGroup Redender');
  const [activeBtn, setActiveBtn] = useState(buttons[0].value);

  useEffect(() => {
    setActiveBtn(activeButton);
  }, [activeButton]);

  return (
    <div className={styles.buttonGroup} {...restProps}>
      {buttons.map((btn, id) => (
        <Button
          key={id}
          size={size}
          variant={variant}
          color={color}
          isActive={btn.value === activeBtn}
          onClick={() => {
            if (btn.value !== activeBtn) {
              setActiveBtn(Object.assign({}, btn));
              onClick(btn.value);
            }
          }}
        >
          {btn.label}
        </Button>
      ))}
    </div>
  );
};
