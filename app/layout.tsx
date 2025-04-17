import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { StoreProvider } from '@/components/Logic/StoreProvider';
import './globals.css';
import { AppInit } from '@/components/Logic/AppInit';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full md:h-screen flex flex-col`}
      >
        <StoreProvider>
          <AppInit />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
