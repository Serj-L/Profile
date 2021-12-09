import { FC, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import { dataBase } from '../../api/Firebase';
import { RootState } from '../../store/index';
import { setSnackBarMsg } from '../../store/appCommonStateSlice';
import {
  changeProjectPreviewType,
  updateLocalProjectsList,
  changeProjectLikeInDbThunk,
  toggleError,
  toggleIsLoading,
} from '../../store/portfolioSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';

import { ProjectCards, Loader } from '../../components';

import styles from './PortfolioPage.module.css';

interface PortfolioPageProps {}

const PortfolioPage: FC<PortfolioPageProps> = () => {
  const { projects, portfolioErrMsg, isLoading, isError } = useAppSelector((state: RootState) => state.portfolio);
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    reduxDispatch(toggleIsLoading({ isLoading: true }));

    const firebaseOnSnapshot = onSnapshot(doc(dataBase, 'portfolio', 'projects'), (projectsFromDb) => {
      if (projectsFromDb.data()) {
        reduxDispatch(toggleIsLoading({ isLoading: false }));
        reduxDispatch(toggleError({ isError: false, errorMsg: '' }));
        reduxDispatch(updateLocalProjectsList(projectsFromDb.data()?.list));
      } else {
        if (!projects.length) {
          reduxDispatch(toggleIsLoading({ isLoading: false }));
          reduxDispatch(toggleError({ isError: true, errorMsg: 'Error while downloading projects, please try to reload page or open Portfolio page later' }));
        }
      }
    });

    return () => firebaseOnSnapshot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!portfolioErrMsg) {
      return;
    }
    reduxDispatch(setSnackBarMsg({ snackBarMsg: portfolioErrMsg }));
  }, [portfolioErrMsg, reduxDispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My projects</h1>
      <div className={styles.projectsWrapper}>
        {
          !isError
            ?
            !isLoading ?
              <ProjectCards
                projects={projects}
                changePreviewTypeHandler={(projectId) => reduxDispatch(changeProjectPreviewType({ projectId }))}
                likeHandler={(projectId, isLiked) => reduxDispatch(changeProjectLikeInDbThunk({ projectId, isLiked }))}
              />
              :
              <Loader/>
            :
            <h2>Error while downloading projects, please try to reload page or open Portfolio page later</h2>
        }
      </div>
    </div>
  );
};

export default PortfolioPage;
