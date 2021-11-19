import { useEffect, useState } from 'react';

import { LocalStorageKeys, ThemeTypes, Routes } from './types';
import { AppRouter, IRoute } from './router';
import { AboutMePage, PortfolioPage } from './pages';
import {
  MainNavigation,
  INavigationLink,
  INavigationButton,
  SocialsNavigation,
  Modal,
  ThemeSwitcher,
} from './components';

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
    title: 'About_Me',
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
      title: 'Contact_Me',
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
        <div className={styles.headerContentWrapper}>
          <div className={styles.logoNavWrapper}>
            <div className={styles.headerLogo}>!SL</div>
            <MainNavigation
              navLinksList={navLinksList}
              navButtonsList={navButtonsList}
            />
          </div>
          <ThemeSwitcher
            themeType={themeType}
            onClickHandler={themeChangeHandler}
          />
        </div>
      </header>
      <main className={styles.mainContentWrapper}>
        <AppRouter
          routesList={routesList}
          redirectPath={Routes.REDIRECTPATH}
        />
      </main>
      <footer className={styles.footer}>
        <SocialsNavigation />
        <span className={styles.footerCopyright}>Serj-L 2021</span>
      </footer>
      <Modal
        isModalActive = {isModalOpen}
        closeModalHandler = {modalOpenHandler}
        modalTitle = 'Test'
      >
        <>
          <div className={styles.modalAppContent}>
            Modal children test content
          </div>
          <div className={styles.modalBtnWrapper}>
            <button
              className={styles.btn}
              disabled={false}
              onClick = {() => console.log('Confirm')}
            >
              Confirm
            </button>
            <button
              className={styles.btn}
              onClick = {() => console.log('Reject')}
            >
              Reject
            </button>
          </div>
        </>
      </Modal>
    </div>
  );
}

export default App;
