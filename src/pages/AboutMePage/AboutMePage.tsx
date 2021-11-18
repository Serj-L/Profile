import { FC } from 'react';

import styles from './AboutMePage.module.css';

interface AboutMePageProps {}

const AboutMePage: FC<AboutMePageProps> = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About me</h1>
    </div>
  );
};

export default AboutMePage;
