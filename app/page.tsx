'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { NavBar } from '@/components/NavBar';
import { IssuesView } from '@/components/Issues/IssuesView';

export default function Home() {
  const repoInfo = useSelector((state: RootState) => state.github.repoInfo);

  return (
    <>
      <Header />
      <div>
        <SearchBar />
      </div>
      {repoInfo && <NavBar {...repoInfo} />}
      <main className="flex-1 flex overflow-hidden">
        <IssuesView />
      </main>
    </>
  );
}
