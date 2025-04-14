import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setAuth, clearAuth } from '@/store/auth';
import { getUserByAccessToken, refreshToken } from '../utils/auth';
import { useLocalStorage } from './useLocalStorage';

export function useAuth() {
  const [accessToken, setAccessToken] = useLocalStorage<string>('token', '');

  const dispatch = useDispatch<AppDispatch>();

  const tryRefreshToken = async () => {
    try {
      setAccessToken((await refreshToken()) ?? '');

      if (accessToken) {
        await tryGetUser();
      }
    } catch {
      dispatch(clearAuth());
    }
  };

  const tryGetUser = async (onError?: () => Promise<void>) => {
    try {
      const user = await getUserByAccessToken(accessToken);
      if (user) {
        console.log(user, accessToken);
        dispatch(setAuth(user, accessToken));
      } else {
        dispatch(clearAuth());
      }
    } catch {
      await onError?.();
    }
  };

  useEffect(() => {
    tryGetUser(tryRefreshToken);
  }, []);
}
