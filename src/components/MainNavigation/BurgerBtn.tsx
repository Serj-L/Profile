import { FC } from 'react';

import styles from './BurgerBtn.module.css';

interface BurgerBtnProps { onClickHandler: () => void }

const BurgerBtn: FC<BurgerBtnProps> = ({ onClickHandler }) => {
  return (
    <div
      className={styles.burgerBtn}
      onClick={onClickHandler}
    >
      <span className={styles.burgerBtnLine}></span>
      <span className={styles.burgerBtnLine}></span>
      <span className={styles.burgerBtnLine}></span>
    </div>
  );
};

export default BurgerBtn;
