import { FC } from 'react';

import styles from './BurgerBtn.module.css';

interface BurgerBtnProps {
  isActive: boolean,
  onClickHandler: () => void
}

const BurgerBtn: FC<BurgerBtnProps> = ({
  isActive,
  onClickHandler,
}) => {
  return (
    <div
      className={styles.burgerBtn}
      data-is-active={isActive}
      onClick={onClickHandler}
    >
      <span className={styles.burgerBtnLine}></span>
      <span className={styles.burgerBtnLine}></span>
      <span className={styles.burgerBtnLine}></span>
    </div>
  );
};

export default BurgerBtn;
