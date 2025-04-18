import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import githubReducer from './githubSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    github: githubReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, undefined, UnknownAction>;

export default store;
