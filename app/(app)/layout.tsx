'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import store, { AppStore } from '@/app/store';
import { AppInit } from '../components/logic/AppInit';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store;
  }

  return (
    <Provider store={storeRef.current}>
      <AppInit />
      {children}
    </Provider>
  );
}
