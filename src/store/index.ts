import { configureStore } from '@reduxjs/toolkit';

import appCommonState from './appCommonStateSlice';
import portfolio from './portfolioSlice';

export const store = configureStore({
  reducer: {
    appCommonState,
    portfolio,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
