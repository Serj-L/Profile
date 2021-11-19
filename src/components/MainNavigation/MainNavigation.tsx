import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './MainNavigation.module.css';

export interface INavigationLink {
  title: string,
  path: string,
}

export interface INavigationButton {
  title: string,
  onClickHandler: () => void,
}

interface MainNavigationProps {
  navLinksList: INavigationLink[],
  navButtonsList: INavigationButton[],
}

const MainNavigation: FC<MainNavigationProps> = ({
  navLinksList,
  navButtonsList,
}) => {
  return (
    <nav className={styles.navList}>
      {
        navLinksList.length
          ?
          navLinksList.map(navLink => {
            return (
              <NavLink
                className={styles.navLinkItem}
                key={navLink.title}
                to={navLink.path}
              >
                {navLink.title}
              </NavLink>
            );
          })
          :
          null
      }
      {
        navButtonsList.length
          ?
          navButtonsList.map(navButton => {
            return (
              <button
                className={styles.navButtonItem}
                key={navButton.title}
                onClick={(e) => {
                  e.currentTarget.blur();
                  navButton.onClickHandler();
                }}
              >
                {navButton.title}
              </button>
            );
          })
          :
          null
      }
    </nav>
  );
};

export { MainNavigation };
