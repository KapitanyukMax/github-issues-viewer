'use client';
import { MouseEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './ui/button';
import LoadingCircle from './LoadingCircle';
import ProfileInfo from './ProfileInfo';
import { RootState } from '@/store';
import { AppDispatch } from '@/store';
import { logout } from '@/store/authSlice';
import { cn } from '@/lib/utils';

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleLogoutClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(logout());
  };

  const handleLoginClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push('/auth/login');
  };

  const handleSignupClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push('/auth/register');
  };

  if (loading)
    return (
      <menu className="flex flex-row justify-start items-center gap-4 pb-4">
        <LoadingCircle />
        <p className="font-semibold">Loading...</p>
      </menu>
    );

  return (
    <menu className={cn('flex flex-row gap-4 pb-4', user ? 'justify-between' : 'justify-end')}>
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
    </menu>
  );
}
