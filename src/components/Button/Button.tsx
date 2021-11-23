import { FC } from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  title: string,
  fontSize: number,
  isDissabled?: boolean,
  isTransparent?: boolean,
  onClickHandler: () => void;
}

const Button: FC<ButtonProps> = ({
  title,
  fontSize,
  isDissabled = false,
  isTransparent = true,
  onClickHandler,
}) => {
  return (
    <button
      className={styles.btn}
      style={{ fontSize: fontSize }}
      disabled={isDissabled}
      data-is-transparent={isTransparent}
      onClick = {(e) => {
        e.currentTarget.blur();
        onClickHandler();
      }}
    >
      {title}
    </button>
  );
};

export default Button;
