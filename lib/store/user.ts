import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../app/types/auth';
import { AppDispatch } from '.';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.user = action.payload.user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const setUser = (user: User, accessToken?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.setUser({ user }));

    if (accessToken) localStorage.setItem('accessToken', accessToken);
  };
};

export const clearUser = (user: User) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.clearUser());

    localStorage.setItem('accessToken', '');
  };
};

export default userSlice.reducer;
