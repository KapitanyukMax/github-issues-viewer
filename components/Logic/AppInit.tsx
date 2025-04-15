'use client';
import { AppDispatch } from '@/store';
import { getUser } from '@/store/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function AppInit() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return null;
}
