import { FC } from 'react';

import { ThemeTypes } from '../../types';

import styles from './ThemeSwitcher.module.css';

interface ThemeSwitcherProps {
  width: number,
  height: number,
  themeType: string;
  onClickHandler: () => void;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  themeType,
  onClickHandler,
  width,
  height,
}) => {
  return (
    <div
      className={styles.switcherContainer}
      style={{ width: width, height: height }}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        id="checkbox"
        checked={themeType === ThemeTypes.LIGHT ? false : true}
        readOnly
      />
      <label
        htmlFor="checkbox"
        className={styles.label}
        onClick = {onClickHandler}
      >
        <span
          className={styles.сratorsWrapper}
        >
          <span className={`${styles.crater} ${styles.crater1}`}></span>
          <span className={`${styles.crater} ${styles.crater2}`}></span>
          <span className={`${styles.crater} ${styles.crater3}`}></span>
        </span>
        <span className={`${styles.star} ${styles.star1}`}></span>
        <span className={`${styles.star} ${styles.star2}`}></span>
        <span className={`${styles.star} ${styles.star3}`}></span>
        <span className={`${styles.star} ${styles.star4}`}></span>
        <span className={`${styles.star} ${styles.star5}`}></span>
        <span className={`${styles.star} ${styles.star6}`}></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
