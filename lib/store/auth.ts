import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../app/types/auth';

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorized(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setAuthorized, clearAuth } = authSlice.actions;

export default authSlice.reducer;
