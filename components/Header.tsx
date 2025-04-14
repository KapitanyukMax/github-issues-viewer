'use client';
import { MouseEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { RootState } from '@/store';
import { logout } from '@/utils/auth';
import { AppDispatch } from '@/store';
import { clearAuth } from '@/store/auth';

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const handleLogoutClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await logout();
    dispatch(clearAuth);
  };

  const handleLoginClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push('/auth/login');
  };

  const handleSignupClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push('/auth/register');
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <menu className="flex flex-row justify-end gap-4 pb-4">
      {user ? (
        <Button variant="outline" onClick={handleLogoutClick}>
          Log Out
        </Button>
      ) : (
        <>
          <Button variant="default" onClick={handleLoginClick}>
            Log In
          </Button>
          <Button variant="outline" onClick={handleSignupClick}>
            Sign Up
          </Button>
        </>
      )}
    </menu>
  );
}
