import { FC, useRef, useState } from 'react';

import { ThemeTypes } from '../../types/index';
import { RootState } from '../../store/index';
import { setSnackBarMsg } from '../../store/appCommonStateSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { getBlobFromDb } from '../../api/Firebase';

import { Button } from '../../components';
import myFoto from '../../images/MyFoto.png';

import styles from './AboutMePage.module.css';

interface AboutMePageProps {
  hireBtnHandler: () => void,
}

const AboutMePage: FC<AboutMePageProps> = ({
  hireBtnHandler,
}) => {
  const [isCVLoading, setIsCVLoading] = useState<boolean>(false);
  const { themeType } = useAppSelector((state: RootState) => state.appCommonState);
  const reduxDispatch = useAppDispatch();
  const downloadCVAnchor = useRef<HTMLAnchorElement>(null);

  const downloadBtnHandler = async () => {
    try {
      setIsCVLoading(true);
      const blob = await getBlobFromDb('cv/lepnyakov_Sergei_front-end-developer.pdf');
      if (downloadCVAnchor.current) {
        downloadCVAnchor.current.href = window.URL.createObjectURL(blob);
        downloadCVAnchor.current.download = 'lepnyakov_Sergei_front-end-developer.pdf';
        downloadCVAnchor.current.click();
      }
    } catch (error) {
      reduxDispatch(setSnackBarMsg({ snackBarMsg: 'Error while downloading CV, please try again later or send me a message.' }));
    } finally {
      setIsCVLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hi, my name is Sergei !</h1>
      <div className={styles.contentWrapper}>
        <p className={styles.text}>
          I`m a passionate front-end developer with a great desire to implement existing experience and obtain a challenging position in a great company with a dream-team of super-duper professionals. I`m a hard-worker focused on achieving high-quality results with the ability to work in both self-starting and collaborative. I`m constantly self-educating to expend my knowledge base and improve developer skills.
        </p>
        <div
          className={styles.visualContentWrapper}
          data-is-neon={themeType === ThemeTypes.DARK}
          data-is-neon-animate={true}
          style={{ background: `url(${myFoto}) top center / cover no-repeat` }}
        >
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          title={'Hire me!'}
          fontSize={28}
          isAccent={true}
          isShadow={true}
          isTransparent={themeType === ThemeTypes.DARK}
          isNeon={themeType === ThemeTypes.DARK}
          onClickHandler={hireBtnHandler}
        />
        <Button
          title={isCVLoading ? 'Downloading CV...' : 'Download my CV'}
          fontSize={28}
          isAccent={true}
          isShadow={true}
          isTransparent={themeType === ThemeTypes.DARK}
          isNeon={themeType === ThemeTypes.DARK}
          isDissabled={isCVLoading}
          onClickHandler={downloadBtnHandler}
        />
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a ref={downloadCVAnchor}></a>
      </div>
    </div>
  );
};

export default AboutMePage;
