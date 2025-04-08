'use client';
import { createContext, useState, useContext, useCallback } from 'react';
import { RepoInfo } from '../types/github';
import { getCacheKey, getRepoInfo } from '../utils/getRepoInfo';

interface GitHubContextType {
  repoInfo: RepoInfo | null;
  loading: boolean;
  loadRepoInfo: (owner: string, repo: string) => Promise<void>;
  updateRepoInfo: (owner: string, repo: string, newRepoInfo: RepoInfo) => void;
}

const GitHubContext = createContext<GitHubContextType | undefined>(undefined);

export const GitHubProvider = ({ children }: { children: React.ReactNode }) => {
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const loadRepoInfo = useCallback(async (owner: string, repo: string) => {
    setLoading(true);
    try {
      const fetched = await getRepoInfo(owner, repo);
      setRepoInfo(fetched);
    } catch (err) {
      console.error('Failed to load repo info:', err);
      setRepoInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRepoInfo = useCallback(async (owner: string, repo: string, newRepoInfo: RepoInfo) => {
    localStorage.setItem(getCacheKey(owner, repo), JSON.stringify(newRepoInfo));
    setRepoInfo(newRepoInfo);
  }, []);

  return (
    <GitHubContext.Provider value={{ repoInfo, loading, loadRepoInfo, updateRepoInfo }}>
      {children}
    </GitHubContext.Provider>
  );
};

export const useGitHub = () => {
  const ctx = useContext(GitHubContext);
  if (!ctx) throw new Error('useIssues must be used within an IssuesProvider');
  return ctx;
};
