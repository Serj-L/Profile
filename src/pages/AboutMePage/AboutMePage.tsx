import { FC, useRef, useState, useEffect } from 'react';

import { getBlobfromDb, getUrlfromDb } from '../../api/Firebase';
import { Button } from '../../components';

import styles from './AboutMePage.module.css';

interface AboutMePageProps {
  hireBtnHandler: () => void,
}

const AboutMePage: FC<AboutMePageProps> = ({
  hireBtnHandler,
}) => {
  const [isCVLoading, setIsCVLoading] = useState<boolean>(false);
  const downloadCVAnchor = useRef<HTMLAnchorElement>(null);
  const mainImg = useRef<HTMLImageElement>(null);

  const downloadBtnHandler = async () => {
    try {
      setIsCVLoading(true);
      const blob = await getBlobfromDb('cv/lepnyakov_Sergei_front-end-developer.pdf');
      if (downloadCVAnchor.current) {
        downloadCVAnchor.current.href = window.URL.createObjectURL(blob);
        downloadCVAnchor.current.download = 'lepnyakov_Sergei_front-end-developer.pdf';
        downloadCVAnchor.current.click();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCVLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const url = await getUrlfromDb('img/Я.jpg');
      if (mainImg.current) {
        mainImg.current.src=url;
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hi, my name is Sergei !</h1>
      <div className={styles.contentWrapper}>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique molestias repellat cumque, eaque ipsam dolorem minima esse! Pariatur aspernatur reprehenderit sapiente. Dignissimos doloremque aperiam quos nobis dolorum, iusto dolores expedita neque nostrum voluptatibus repellat unde quia voluptatum vitae culpa totam impedit eos, aspernatur autem similique ex beatae est eveniet! Facilis doloribus doloremque quidem dolorum illum enim repellendus commodi, deserunt iure laboriosam animi, nisi fugit et quasi ullam minus maiores incidunt in sed voluptates. Placeat quibusdam sequi eum? Doloremque facere commodi ipsa dolore nam animi necessitatibus, soluta aperiam debitis neque? Dignissimos accusamus reprehenderit maiores esse! Eveniet iste, molestiae ad ipsum error deleniti, quae placeat nam veritatis culpa asperiores? Aliquam voluptatibus alias, fugit, quis exercitationem esse iusto, unde voluptas adipisci quisquam ratione placeat minus. Minus voluptas eaque corporis, officiis odit alias enim fuga quidem nobis aliquam neque architecto quos perspiciatis molestiae laborum sequi deserunt iste incidunt beatae voluptate veritatis omnis cumque asperiores.
        </p>
        <img
          className={styles.aboutMeImg}
          ref={mainImg}
          alt=""
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          title={'Hire me!'}
          fontSize={22}
          isTransparent={false}
          isAccent={true}
          isShadow={true}
          onClickHandler={hireBtnHandler}
        />
        <Button
          title={isCVLoading ? 'Dowloading CV...' : 'Download my CV'}
          fontSize={22}
          isTransparent={false}
          isAccent={true}
          isShadow={true}
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
