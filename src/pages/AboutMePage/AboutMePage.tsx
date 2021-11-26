import { FC, useRef, useState } from 'react';

import { ThemeTypes } from '../../types/index';
import { RootState } from '../../store/index';
import { setSnackBarMsg } from '../../store/appCommonStateSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { getBlobFromDb } from '../../api/Firebase';

import { Button } from '../../components';

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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique molestias repellat cumque, eaque ipsam dolorem minima esse! Pariatur aspernatur reprehenderit sapiente. Dignissimos doloremque aperiam quos nobis dolorum, iusto dolores expedita neque nostrum voluptatibus repellat unde quia voluptatum vitae culpa totam impedit eos, aspernatur autem similique ex beatae est eveniet! Facilis doloribus doloremque quidem dolorum illum enim repellendus commodi, deserunt iure laboriosam animi, nisi fugit et quasi ullam minus maiores incidunt in sed voluptates. Placeat quibusdam sequi eum? Doloremque facere commodi ipsa dolore nam animi necessitatibus, soluta aperiam debitis neque? Dignissimos accusamus reprehenderit maiores esse! Eveniet iste, molestiae ad ipsum error deleniti, quae placeat nam veritatis culpa asperiores? Aliquam voluptatibus alias, fugit, quis exercitationem esse iusto, unde voluptas adipisci quisquam ratione placeat minus. Minus voluptas eaque corporis, officiis odit alias enim fuga quidem nobis aliquam neque architecto quos perspiciatis molestiae laborum sequi deserunt iste incidunt beatae voluptate veritatis omnis cumque asperiores.
        </p>
        <div
          className={styles.visualContentWrapper}
          data-is-neon={themeType === ThemeTypes.DARK}
          data-is-neon-animate={true}
        >
          <img
            className={styles.aboutMeImg}
            src='https://firebasestorage.googleapis.com/v0/b/profile-website-23ec0.appspot.com/o/img%2F%D0%AF.jpg?alt=media&token=0feb956d-96d3-49f3-8ab5-73f534e5e35a'
            alt=""
          />
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
