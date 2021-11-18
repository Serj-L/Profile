import { useEffect, useState } from 'react';

import { LocalStorageKeys, ThemeTypes, Routes } from './types';
import { AppRouter, IRoute } from './router';
import { AboutMePage, PortfolioPage } from './pages';
import { MainNavigation, INavigationLink, INavigationButton, ThemeSwitcher } from './components';

import styles from './App.module.css';

const routesList: IRoute[] = [
  {
    path: Routes.ABOUTME,
    component: AboutMePage,
  },
  {
    path: Routes.PORTFOLIO,
    component: PortfolioPage,
  },
];
const navLinksList: INavigationLink[] = [
  {
    title: 'About Me',
    path: Routes.ABOUTME,
  },
  {
    title: 'Portfolio',
    path: Routes.PORTFOLIO,
  },
];

function App() {
  const [themeType, setThemeType] = useState<string>(localStorage.getItem(LocalStorageKeys.THEMETYPE) || ThemeTypes.LIGHT);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const modalOpenHandler = () => {
    setIsModalOpen(!isModalOpen);
  };
  const navButtonsList: INavigationButton[] = [
    {
      title: 'Contact Me',
      onClickHandler: modalOpenHandler,
    },
  ];
  const themeChangeHandler = () => {
    setThemeType(themeType === ThemeTypes.LIGHT ? ThemeTypes.DARK: ThemeTypes.LIGHT);
  };

  useEffect(() => {
    if (localStorage.getItem(LocalStorageKeys.THEMETYPE) !== themeType) {
      localStorage.setItem(LocalStorageKeys.THEMETYPE, themeType);
    }
  }, [themeType]);

  return (
    <div
      className={styles.App}
      data-theme-type = {themeType}
    >
      <header className={styles.header}>
        <div className={styles.headerLogo}>LOGO</div>
        <MainNavigation
          navLinksList={navLinksList}
          navButtonsList={navButtonsList}
        />
        <ThemeSwitcher
          width={60}
          height={30}
          themeType={themeType}
          onClickHandler={themeChangeHandler}
        />
      </header>
      <main className={styles.mainContent}>
        <AppRouter
          routesList={routesList}
          redirectPath={Routes.REDIRECTPATH}
        />
      </main>
      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );
}

export default App;
