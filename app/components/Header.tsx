'use client';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { LoadingCircle } from './LoadingCircle';
import { ProfileInfo } from './ProfileInfo';
import { AppDispatch } from '@/app/store';
import { logout, selectAuthStatus, selectUser } from '@/app/store/authSlice';
import { cn } from '@/lib/utils';

export function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const authStatus = useSelector(selectAuthStatus);
  const router = useRouter();

  const handleLogoutClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await dispatch(logout());
  };

  const handleLoginClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push('/login');
  };

  const handleSignupClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push('/register');
  };

  if (authStatus === 'loading')
    return (
      <menu className="flex flex-row justify-start items-center gap-4 pb-4">
        <LoadingCircle />
        <p className="font-semibold">Loading...</p>
      </menu>
    );

  return (
    <header
      className={cn(
        'flex flex-row gap-4 pb-4 items-baseline',
        user ? 'justify-between' : 'justify-end'
      )}
    >
      {user ? (
        <>
          <ProfileInfo user={user} />
          <Button variant="outline" onClick={handleLogoutClick}>
            Log Out
          </Button>
        </>
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
    </header>
  );
}
