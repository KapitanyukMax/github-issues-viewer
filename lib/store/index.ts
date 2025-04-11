import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import userReducer from './user';
import githubReducer from './github';

const store = configureStore({
  reducer: {
    user: userReducer,
    github: githubReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, undefined, UnknownAction>;

export default store;
