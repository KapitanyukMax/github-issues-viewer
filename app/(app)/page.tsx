'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Header } from '@/app/components/Header';
import { SearchBar } from '@/app/components/SearchBar';
import { NavBar } from '@/app/components/NavBar';
import { IssuesView } from '@/app/components/Issues/IssuesView';

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
