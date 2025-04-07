'use client';
import { createContext, useState, useContext, useCallback } from 'react';
import { GitHubIssue } from '../types/github';
import getGitHubIssues from '../utils/getGitHubIssues';

interface IssuesContextType {
  issues: GitHubIssue[] | null;
  loading: boolean;
  loadIssues: (owner: string, repo: string) => Promise<void>;
}

const IssuesContext = createContext<IssuesContextType | undefined>(undefined);

export const IssuesProvider = ({ children }: { children: React.ReactNode }) => {
  const [issues, setIssues] = useState<GitHubIssue[] | null>(null);
  const [loading, setLoading] = useState(false);

  const loadIssues = useCallback(async (owner: string, repo: string) => {
    setLoading(true);
    try {
      const fetched = await getGitHubIssues(owner, repo);
      setIssues(fetched);
    } catch (err) {
      console.error('Failed to load issues:', err);
      setIssues(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <IssuesContext.Provider value={{ issues, loading, loadIssues }}>
      {children}
    </IssuesContext.Provider>
  );
};

export const useIssues = () => {
  const ctx = useContext(IssuesContext);
  if (!ctx) throw new Error('useIssues must be used within an IssuesProvider');
  return ctx;
};
