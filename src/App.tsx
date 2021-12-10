import { useState } from 'react';

import {
  ThemeTypes,
  RoutesEnum,
  UserRequestTypes,
} from './types';
import { RootState } from './store/index';
import {
  setThemeType,
  setSnackBarMsg,
} from './store/appCommonStateSlice';
import {
  useAppDispatch,
  useAppSelector,
} from './hooks/redux';
import { sendUserMessage } from './api/EmalJS';
import { AppRouter } from './router';
import {
  MainNavigation,
  INavigationLink,
  INavigationButton,
  BurgerBtn,
  SocialsNavigation,
  Modal,
  Button,
  ContactForm,
  ThemeSwitcher,
  SnackBar,
} from './components';

import logo from './images/MyLogo.png';

import styles from './App.module.css';

const navLinksList: INavigationLink[] = [
  {
    title: 'About_Me',
    path: RoutesEnum.ABOUTME,
  },
  {
    title: 'Portfolio',
    path: RoutesEnum.PORTFOLIO,
  },
];

const emailValidator: (email: string) => boolean = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userMessage, setUserMessage] = useState<string>('');
  const [isUserEmailValid, setIsUserEmailValid] = useState<boolean>(true);
  const [isSendingMsg, setIsSendingMsg] = useState<boolean>(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
  const [userMsgTitle, setUserMsgTitle] = useState<UserRequestTypes.CONTACT | UserRequestTypes.HIRE>(UserRequestTypes.CONTACT);
  const { themeType, snackBarMsg } = useAppSelector((state: RootState) => state.appCommonState);
  const reduxDispatch = useAppDispatch();

  const navButtonsList: INavigationButton[] = [
    {
      title: 'Contact_Me',
      onClickHandler: () => modalOpenHandler(UserRequestTypes.CONTACT),
    },
  ];

  function modalOpenHandler(requestType: UserRequestTypes.CONTACT | UserRequestTypes.HIRE) {
    setIsModalOpen(!isModalOpen);
    setUserMsgTitle(requestType);
  }
  const themeChangeHandler = () => {
    reduxDispatch(setThemeType({ themeType: themeType === ThemeTypes.LIGHT ? ThemeTypes.DARK: ThemeTypes.LIGHT }));
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
      setIsSendingMsg(true);
      await sendUserMessage(userFormData);
      reduxDispatch(setSnackBarMsg({ snackBarMsg: `Your ${userMsgTitle.toLowerCase()} was send.` }));
      cancelBtnHandler();
    } catch (error) {
      reduxDispatch(setSnackBarMsg({ snackBarMsg: `Error while sending your ${userMsgTitle.toLowerCase()}, please try to send it later.` }));
      setIsModalOpen(false);
    } finally {
      setIsSendingMsg(false);
    }
  };

  return (
    <div
      className={styles.App}
      data-theme-type = {themeType}
    >
      <header className={styles.header}>
        <div className={styles.headerContentWrapper}>
          <div className={styles.logoNavWrapper}>
            <div className={styles.headerLogo}>
              <img
                className={styles.headerLogoImg}
                src={`${logo}`}
                alt="logo" />
            </div>
            <MainNavigation
              navLinksList={navLinksList}
              navButtonsList={navButtonsList}
              isActive={isNavMenuOpen}
              onClickHandler={() => setIsNavMenuOpen(false)}
            />
            <BurgerBtn
              isActive={isNavMenuOpen}
              onClickHandler={() => setIsNavMenuOpen(!isNavMenuOpen)}
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
          aboutMeHireBtnHandler={() => modalOpenHandler(UserRequestTypes.HIRE)}
        />
      </main>
      <footer className={styles.footer}>
        <SocialsNavigation />
        <span className={styles.footerCopyright}>Serj-L 2021</span>
      </footer>
      <Modal
        isModalActive = {isModalOpen}
        closeModalHandler = {cancelBtnHandler}
        modalTitle={`${userMsgTitle} form`}
        isAccent={userMsgTitle === UserRequestTypes.HIRE}
      >
        <>
          <div className={styles.modalAppContent}>
            <ContactForm
              textAreaTitle={userMsgTitle}
              userNameInputValue={userName}
              userEmailInputValue={userEmail}
              textAreaValue={userMessage}
              isAccent={userMsgTitle === UserRequestTypes.HIRE}
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
              title={isSendingMsg ? 'Sending...' : `Send a ${userMsgTitle.toLowerCase()}`}
              fontSize={18}
              isDissabled={isSendingMsg || !isUserEmailValid || !(userName && userEmail && userMessage)}
              isAccent={userMsgTitle === UserRequestTypes.HIRE}
              onClickHandler={sendMessageHandler}
            />
            <Button
              title={'Cancel'}
              fontSize={18}
              isAccent={userMsgTitle === UserRequestTypes.HIRE}
              onClickHandler={cancelBtnHandler}
            />
          </div>
        </>
      </Modal>
      <SnackBar
        message={snackBarMsg}
        duration={7000}
        clearMsg={() => reduxDispatch(setSnackBarMsg({ snackBarMsg: '' }))}
      />
    </div>
  );
}

export default App;
