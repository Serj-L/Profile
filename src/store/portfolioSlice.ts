import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { LocalStorageKeys } from '../types';
import { changeProjectLikeInDb, IProjectsFromDb } from '../api/Firebase';

export interface IProjectsSlice extends IProjectsFromDb {
  isLiked: boolean,
}

export interface IToggleProjectLikedParams {
  projectId: string,
  isLiked: boolean,
}
interface IPortfolio {
  projects: IProjectsSlice[],
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

export const changeProjectLikeInDbThunk = createAsyncThunk(
  'potfolio/changeProjectLikeInDbThunk',
  async (params: IToggleProjectLikedParams, { rejectWithValue }) => {
    try {
      const response = await changeProjectLikeInDb(params.projectId, params.isLiked);
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
    toggleIsLoading(state, action: PayloadAction<{isLoading: boolean}>) {
      state.isLoading = action.payload.isLoading;
    },
    toggleError(state, action: PayloadAction<{isError: boolean, errorMsg: string}>) {
      const { isError, errorMsg } = action.payload;
      state.isError = isError;
      state.portfolioErrMsg = errorMsg;
    },
    changeProjectPreviewType(state, action: PayloadAction<{projectId: string}>) {
      const mobPreviewProjects = new Set (JSON.parse(localStorage.getItem(LocalStorageKeys.MOBPREVIEWPROJECTS) || '[]'));
      const { projectId } = action.payload;

      state.projects = state.projects.map(project => {
        return project.id === projectId
          ? { ...project, isMobilePreview: !project.isMobilePreview }
          : project;
      });

      if (state.projects.filter(project => project.id === action.payload.projectId)[0].isMobilePreview) {
        mobPreviewProjects.add(projectId);
      } else {
        if (mobPreviewProjects.size) {
          mobPreviewProjects.delete(projectId);
        }
      }

      localStorage.setItem(LocalStorageKeys.MOBPREVIEWPROJECTS, mobPreviewProjects.size ? JSON.stringify(Array.from(mobPreviewProjects)) : '');
    },
    updateLocalProjectsList(state, action: PayloadAction<IProjectsFromDb[]>) {
      if (action.payload.length) {
        const projects = action.payload;
        const likedProjects = new Set (JSON.parse(localStorage.getItem(LocalStorageKeys.LIKEDPROJECTS) || '[]'));
        const mobPreviewProjects = new Set (JSON.parse(localStorage.getItem(LocalStorageKeys.MOBPREVIEWPROJECTS) || '[]'));

        state.projects = projects.map(project => (
          { ...project,
            isMobilePreview: mobPreviewProjects.has(project.id),
            isLiked: likedProjects.has(project.id),
          }
        ));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeProjectLikeInDbThunk.pending, (state) => {
      state.isLoading = true;

      if (state.isError) {
        state.isError = false;
        state.portfolioErrMsg = '';
      }
    });
    builder.addCase(changeProjectLikeInDbThunk.fulfilled, (state, action) => {
      const { projectId, isLiked } = action.payload as IToggleProjectLikedParams;
      const likedProjects = new Set (JSON.parse(localStorage.getItem(LocalStorageKeys.LIKEDPROJECTS) || '[]'));

      state.projects = state.projects.map(project => {
        return project.id === projectId
          ? { ...project, isLiked: isLiked }
          : project;
      });
      state.isLoading = false;
      isLiked ? likedProjects.add(projectId) : likedProjects.delete(projectId);
      localStorage.setItem(LocalStorageKeys.LIKEDPROJECTS, likedProjects.size ? JSON.stringify(Array.from(likedProjects)) : '');
    });
    builder.addCase(changeProjectLikeInDbThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.portfolioErrMsg = `Error while raiting project: ${action.payload}. Please try it later.`;
    });
  },
});

export const {
  changeProjectPreviewType,
  updateLocalProjectsList,
  toggleError,
  toggleIsLoading,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;
