import { FC, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import { dataBase } from '../../api/Firebase';
import { RootState } from '../../store/index';
import { setSnackBarMsg } from '../../store/appCommonStateSlice';
import {
  changeProjectPreviewType,
  updateLocalProjectsList,
  changeProjectLikeInDbThunk,
} from '../../store/portfolioSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';

import { ProjectCards } from '../../components';

import styles from './PortfolioPage.module.css';

interface PortfolioPageProps {}

const PortfolioPage: FC<PortfolioPageProps> = () => {
  const { projects, portfolioErrMsg } = useAppSelector((state: RootState) => state.portfolio);
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    const firebaseOnSnapshot = onSnapshot(doc(dataBase, 'portfolio', 'projects'), (projects) => {
      if (projects.data()) {
        reduxDispatch(updateLocalProjectsList(projects.data()?.list));
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
      <h1 className={styles.title}>Portfolio</h1>
      <div className={styles.projectsWrapper}>
        {
          projects.length
            ?
            <ProjectCards
              projects={projects}
              changePreviewTypeHandler={(projectId) => reduxDispatch(changeProjectPreviewType({ projectId }))}
              likeHandler={(projectId, isLiked) => reduxDispatch(changeProjectLikeInDbThunk({ projectId, isLiked }))}
            />
            :
            <h2>Error while downloading projects, please try to reload page or open Portfolio page later</h2>
        }
      </div>
    </div>
  );
};

export default PortfolioPage;
