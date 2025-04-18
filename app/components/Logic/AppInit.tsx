'use client';
import { AppDispatch } from '@/app/store';
import { getUser } from '@/app/store/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function AppInit() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return null;
}
