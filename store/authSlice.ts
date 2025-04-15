import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '@/types/shared/UserInfo';
import { AppDispatch, AppThunk } from '.';
import { getErrorMessage } from '@/utils/errors';

interface UserResponseData {
  data: UserInfo;
}

export interface AuthState {
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setLoading(state) {
      state.loading = true;
    },
    unsetLoading(state) {
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const login = (email: string, password: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setLoading());
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { data: user } = res.data as UserResponseData;

      dispatch(authSlice.actions.setUser(user));
      dispatch(authSlice.actions.clearError());
    } catch (error) {
      dispatch(authSlice.actions.setError(getErrorMessage(error)));
      dispatch(authSlice.actions.clearUser());
    } finally {
      dispatch(authSlice.actions.unsetLoading());
    }
  };
};

export const logout = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setLoading());
    try {
      await axios.post('/api/auth/logout');
      dispatch(authSlice.actions.clearError());
    } catch (error) {
      dispatch(authSlice.actions.setError(getErrorMessage(error)));
    } finally {
      dispatch(authSlice.actions.clearUser());
      dispatch(authSlice.actions.unsetLoading());
    }
  };
};

export const register = (email: string, password: string, name: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setLoading());
    try {
      const res = await axios.post('/api/auth/register', { email, password, name });
      const { data: user } = res.data as UserResponseData;

      dispatch(authSlice.actions.setUser(user));
      dispatch(authSlice.actions.clearError());
    } catch (error) {
      dispatch(authSlice.actions.setError(getErrorMessage(error)));
      dispatch(authSlice.actions.clearUser());
    } finally {
      dispatch(authSlice.actions.unsetLoading());
    }
  };
};

export const getUser = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    const fetchProfile = async () => {
      const res = await axios.get('/api/profile');
      const { data: user } = res.data as UserResponseData;
      return user;
    };

    const refresh = async () => {
      await axios.post('/api/auth/refresh');
    };

    dispatch(authSlice.actions.setLoading());
    try {
      let user: UserInfo;
      try {
        user = await fetchProfile();
      } catch {
        await refresh();
        user = await fetchProfile();
      }

      dispatch(authSlice.actions.setUser(user));
      dispatch(authSlice.actions.clearError());
    } catch (error) {
      dispatch(authSlice.actions.clearUser());
    } finally {
      dispatch(authSlice.actions.unsetLoading());
    }
  };
};

export const { setError, clearError } = authSlice.actions;

export default authSlice.reducer;
