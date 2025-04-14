import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/ui/auth';
import { AppDispatch, AppThunk } from '.';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const setAuth = (user: User, accessToken: string): AppThunk => {
  return (dispatch: AppDispatch) => {
    localStorage.setItem('token', accessToken);

    dispatch(authSlice.actions.setUser(user));
  };
};

export const clearAuth = (): AppThunk => {
  return (dispatch: AppDispatch) => {
    localStorage.setItem('token', '');

    dispatch(authSlice.actions.clearUser());
  };
};

export default authSlice.reducer;
