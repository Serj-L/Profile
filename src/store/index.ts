import { configureStore } from '@reduxjs/toolkit';

import appCommonState from './appCommonStateSlice';

export const store = configureStore({
  reducer: {
    appCommonState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
