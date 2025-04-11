'use client';
import { useSelector } from 'react-redux';
import store, { RootState } from '../lib/store';
import SearchBar from '@/components/SearchBar';
import NavBar from '@/components/NavBar';
import IssuesView from '@/components/IssuesView';

export default function Home() {
  const repoInfo = useSelector((state: RootState) => state.github.repoInfo);

  return (
    <>
      <header>
        <SearchBar />
      </header>
      {repoInfo && <NavBar {...repoInfo} />}
      <main className="flex-1 flex overflow-hidden">
        <IssuesView />
      </main>
    </>
  );
}
