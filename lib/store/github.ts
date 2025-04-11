import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IssueStatus, RepoInfo } from '@/app/types/github';
import { getRepoInfo, updateIssueStatusCache } from '@/app/utils/repoInfo';
import { AppThunk, AppDispatch, RootState } from '.';

export interface GitHubState {
  repoInfo: RepoInfo | null;
  loading: boolean;
}

const initialState: GitHubState = {
  repoInfo: null,
  loading: false,
};

const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    setRepoInfo(state, action: PayloadAction<RepoInfo>) {
      state.repoInfo = Object.assign({}, action.payload);
      state.loading = false;
    },
    setIssueStatus(state, action: PayloadAction<{ issueIndex: number; issueStatus: IssueStatus }>) {
      const { issueIndex, issueStatus } = action.payload;
      if (!state.repoInfo) return;
      state.repoInfo.issues[issueIndex].status = issueStatus;
    },
    clearRepoInfo(state) {
      state.repoInfo = null;
      state.loading = false;
    },
    setLoadingState(state) {
      state.loading = true;
    },
    setLoadedState(state) {
      state.loading = false;
    },
  },
});

export const loadRepoInfo = (owner: string, repo: string, loadMore: boolean): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(githubSlice.actions.setLoadingState());

    try {
      const fetched = await getRepoInfo(owner, repo, loadMore);
      dispatch(githubSlice.actions.setRepoInfo(fetched));
    } catch (err) {
      console.error('Failed to load repo info:', err);
      dispatch(githubSlice.actions.clearRepoInfo());
    }
  };
};

export const updateIssueStatus = (issueIndex: number, issueStatus: IssueStatus): AppThunk => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const repoInfo = getState().github.repoInfo;
    if (!repoInfo) return;

    updateIssueStatusCache(repoInfo.owner, repoInfo.repo, issueIndex, issueStatus);
    dispatch(githubSlice.actions.setIssueStatus({ issueIndex, issueStatus }));
  };
};

export const clearRepoInfo = githubSlice.actions.clearRepoInfo;

export default githubSlice.reducer;
