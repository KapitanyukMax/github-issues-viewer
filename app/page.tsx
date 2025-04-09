'use client';
import SearchBar from '@/components/SearchBar';
import NavBar from '@/components/NavBar';
import { useGitHub } from './context/GitHubContext';
import IssuesView from '@/components/IssuesView';
import { IssueInfo } from './types/github';

export default function Home() {
  const { repoInfo } = useGitHub();

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
