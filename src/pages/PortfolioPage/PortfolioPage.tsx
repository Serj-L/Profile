import { FC, useEffect } from 'react';

import { RootState } from '../../store/index';
import { getProjectsFromDbThunk } from '../../store/portfolioSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';

import styles from './PortfolioPage.module.css';

interface PortfolioPageProps {}

const PortfolioPage: FC<PortfolioPageProps> = () => {
  const { projects } = useAppSelector((state: RootState) => state.portfolio);
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    if (projects.length) {
      return;
    }
    reduxDispatch(getProjectsFromDbThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Portfolio</h1>
      {
        projects.length
          ?
          <ul className={styles.projectsList}>
            {
              projects.map((project) => (
                <li
                  key={project.id}
                  className={styles.project}
                >
                  {project.title}
                </li>
              ))
            }
          </ul>
          : null
      }
    </div>
  );
};

export default PortfolioPage;
