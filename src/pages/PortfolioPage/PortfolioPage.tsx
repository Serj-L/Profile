import { FC } from 'react';

import styles from './PortfolioPage.module.css';

interface PortfolioPageProps {}

const PortfolioPage: FC<PortfolioPageProps> = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Portfolio</h1>
    </div>
  );
};

export default PortfolioPage;
