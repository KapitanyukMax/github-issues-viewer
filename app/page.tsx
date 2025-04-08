'use client';
import SearchBar from '@/components/SearchBar';
import NavBar from '@/components/NavBar';
import { useGitHub } from './context/GitHubContext';

export default function Home() {
  const { repoInfo } = useGitHub();

  return (
    <>
      <header>
        <SearchBar />
      </header>
      {repoInfo && <NavBar {...repoInfo} />}
      <main></main>
    </>
  );
}
