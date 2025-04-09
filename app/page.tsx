'use client';
import { useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import NavBar from '@/components/NavBar';
import { useGitHub } from './context/GitHubContext';
import IssuesView from '@/components/IssuesView';

export default function Home() {
  const { repoInfo } = useGitHub();
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => console.log(users));
  }, []);

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
