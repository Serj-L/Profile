import { useEffect, useState } from 'react';

import { LocalStorageKeys, ThemeTypes, Routes } from './types';
import { sendUserMessage } from './api/EmalJS';
import { AppRouter, IRoute } from './router';
import { AboutMePage, PortfolioPage } from './pages';
import {
  MainNavigation,
  INavigationLink,
  INavigationButton,
  SocialsNavigation,
  Modal,
  Button,
  ContactForm,
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

const emailValidator: (email: string) => boolean = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
};

function App() {
  const [themeType, setThemeType] = useState<string>(localStorage.getItem(LocalStorageKeys.THEMETYPE) || ThemeTypes.LIGHT);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userMessage, setUserMessage] = useState<string>('');
  const [isUserEmailValid, setIsUserEmailValid] = useState<boolean>(true);

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

  const cancelBtnHandler = () => {
    setUserName('');
    setUserEmail('');
    setUserMessage('');
    setIsUserEmailValid(true);
    setIsModalOpen(false);
  };

  const sendMessageHandler = async () => {
    const userFormData = {
      name: userName.trim(),
      email: userEmail.trim(),
      message: userMessage.trim(),
    };
    try {
      const result = await sendUserMessage(userFormData);
      console.log(result);
      cancelBtnHandler();
    } catch (error) {
      console.log(error);
    }
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
        closeModalHandler = {cancelBtnHandler}
        modalTitle = 'Contact form'
      >
        <>
          <div className={styles.modalAppContent}>
            <ContactForm
              textAreaTitle={'Message'}
              userNameInputValue={userName}
              userEmailInputValue={userEmail}
              textAreaValue={userMessage}
              userNameInputOnChangeHandler={(value) => setUserName(value)}
              userEmailInputOnChangeHandler={(value) => {
                setUserEmail(value);
                setIsUserEmailValid(emailValidator(value));
              }}
              textAreaInputOnChangeHandler={(value) => setUserMessage(value)}
              isEmailValid={isUserEmailValid}
            />
          </div>
          <div className={styles.modalBtnWrapper}>
            <Button
              title={'Send message'}
              fontSize={18}
              isDissabled={false}
              onClickHandler={sendMessageHandler}
            />
            <Button
              title={'Cancel'}
              fontSize={18}
              onClickHandler={cancelBtnHandler}
            />
          </div>
        </>
      </Modal>
    </div>
  );
}

export default App;
