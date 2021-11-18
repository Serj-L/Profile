import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

export interface IRoute {
  path: string,
  component: FC,
}

interface AppRouterProps {
  routesList: IRoute[],
  redirectPath: string,
}

export const AppRouter: FC<AppRouterProps> = ({
  routesList,
  redirectPath,
}) => {
  return (
    <Routes>
      {
        routesList.length
          ?
          routesList.map(route => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            );
          })
          :
          null
      }
      <Route
        path='*'
        element={<Navigate to={redirectPath} />}
      />
    </Routes>
  );
};
