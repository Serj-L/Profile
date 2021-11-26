import { FC } from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  title: string,
  fontSize: number,
  isDissabled?: boolean,
  isTransparent?: boolean,
  isAccent?: boolean,
  isShadow?: boolean,
  isNeon?: boolean,
  onClickHandler: () => void;
}

const Button: FC<ButtonProps> = ({
  title,
  fontSize,
  isDissabled = false,
  isTransparent = true,
  isAccent = false,
  isShadow = false,
  isNeon = false,
  onClickHandler,
}) => {
  return (
    <button
      className={styles.btn}
      style={{ fontSize: fontSize }}
      disabled={isDissabled}
      data-is-transparent={isTransparent}
      data-is-accent={isAccent}
      data-is-shadow={isShadow}
      data-is-neon={isNeon}
      onClick={(e) => {
        e.currentTarget.blur();
        onClickHandler();
      }}
    >
      {title}
    </button>
  );
};

export default Button;
