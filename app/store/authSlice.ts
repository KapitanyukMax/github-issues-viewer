import axios from 'axios';
import { createSlice, isAnyOf, isPending, isRejected } from '@reduxjs/toolkit';
import { UserInfo } from '@/app/types/shared/UserInfo';
import { LoginDto } from '@/app/types/shared/dto/auth/LoginDto';
import { RootState } from '.';
import { createAppAsyncThunk } from './withTypes';
import { getErrorMessage } from '@/app/utils/errors';
import { RegisterDto } from '@/app/types/shared/dto/auth/RegisterDto';

interface UserResponseData {
  data: UserInfo;
}

export interface AuthState {
  user: UserInfo | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logout.fulfilled, () => initialState)
      .addMatcher(
        isAnyOf(login.fulfilled, register.fulfilled, getUser.fulfilled),
        (state, action) => {
          state.user = action.payload;
          state.status = 'idle';
        }
      )
      .addMatcher(isPending, state => {
        state.status = 'loading';
      })
      .addMatcher(isRejected, (state, action) => {
        state.status = 'failed';
        state.error = getErrorMessage(action.error);
      });
  },
});

export const login = createAppAsyncThunk('auth/login', async (user: LoginDto) => {
  try {
    const res = await axios.post('/api/auth/login', user);
    const { data: userInfo } = res.data as UserResponseData;
    return userInfo;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
});

export const logout = createAppAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('/api/auth/logout');
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
});

export const register = createAppAsyncThunk('auth/register', async (user: RegisterDto) => {
  try {
    const res = await axios.post('/api/auth/register', user);
    const { data: userInfo } = res.data as UserResponseData;
    return userInfo;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
});

export const getUser = createAppAsyncThunk('auth/getUser', async (): Promise<UserInfo> => {
  const fetchProfile = async () => {
    const res = await axios.get('/api/profile');
    const { data: user } = res.data as UserResponseData;
    return user;
  };

  try {
    try {
      return await fetchProfile();
    } catch {
      await axios.post('/api/auth/refresh');
      return await fetchProfile();
    }
  } catch (error) {
    console.log(error);
    throw new Error(getErrorMessage(error));
  }
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
