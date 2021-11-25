import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { RoutesEnum } from '../types';
import { AboutMePage, PortfolioPage } from '../pages';
interface AppRouterProps {
  aboutMeHireBtnHandler: () => void,
}

export const AppRouter: FC<AppRouterProps> = ({
  aboutMeHireBtnHandler,
}) => {
  return (
    <Routes>
      <Route
        path={RoutesEnum.ABOUTME}
        element={<AboutMePage hireBtnHandler={aboutMeHireBtnHandler}/>}
      />
      <Route
        path={RoutesEnum.PORTFOLIO}
        element={<PortfolioPage />}
      />
      <Route
        path='*'
        element={<Navigate to={RoutesEnum.REDIRECTPATH} />}
      />
    </Routes>
  );
};
