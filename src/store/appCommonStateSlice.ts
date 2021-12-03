import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ThemeTypes, LocalStorageKeys } from '../types';

interface IAppCommonState {
  themeType: string,
  snackBarMsg: string,
}

const initialState = {
  themeType: localStorage.getItem(LocalStorageKeys.THEMETYPE) || ThemeTypes.LIGHT,
  snackBarMsg: '',
} as IAppCommonState;

const appCommonStateSlice = createSlice({
  name: 'appCommonState',
  initialState,
  reducers: {
    setThemeType(state, action: PayloadAction<{themeType: ThemeTypes}>) {
      if (state.themeType !== action.payload.themeType) {
        state.themeType = action.payload.themeType;
        localStorage.setItem(LocalStorageKeys.THEMETYPE, action.payload.themeType);
      }
    },
    setSnackBarMsg(state, action: PayloadAction<{snackBarMsg: string}>) {
      state.snackBarMsg = action.payload.snackBarMsg;
    },
  },
});

export const { setThemeType, setSnackBarMsg } = appCommonStateSlice.actions;
export default appCommonStateSlice.reducer;
