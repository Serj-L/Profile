import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getProjectsFromDb, IProjectsFromDb } from '../api/Firebase';

interface IPortfolio {
  projects: IProjectsFromDb[],
  isLoading: boolean,
  isError: boolean,
  portfolioErrMsg: string,
}

const initialState = {
  projects: [],
  isLoading: false,
  isError: false,
  portfolioErrMsg: '',
} as IPortfolio;

export const getProjectsFromDbThunk = createAsyncThunk(
  'potfolio/getProjectsFromDbThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProjectsFromDb();

      return response;
    } catch(err: any) {
      return rejectWithValue(err.code);
    }
  },
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getProjectsFromDbThunk.pending, (state) => {
      state.isLoading = true;

      if (state.isError) {
        state.isError = false;
        state.portfolioErrMsg = '';
      }
    });
    builder.addCase(getProjectsFromDbThunk.fulfilled, (state, action) => {
      state.projects = action.payload ? action.payload : [];
      state.isLoading = false;
    });
    builder.addCase(getProjectsFromDbThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.portfolioErrMsg = `Error loading projects list from cloud store: ${action.payload}`;
    });
  },
});

//export const {  } = portfolioSlice.actions;
export default portfolioSlice.reducer;
