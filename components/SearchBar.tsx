'use client';
import { ChangeEvent, useState, useEffect } from 'react';
import { useGitHub } from '@/app/context/GitHubContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidGitHubRepoUrl, parseGitHubRepoUrl } from '@/app/utils/githubUrls';

export default function SearchBar() {
  const { loadRepoInfo, unloadRepoInfo } = useGitHub();
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const savedUrl = sessionStorage.getItem('url');
    if (!savedUrl) return;

    setUrl(savedUrl);
    const { owner, repo } = parseGitHubRepoUrl(savedUrl);
    loadRepoInfo(owner, repo);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);

    if (error) {
      setError(null);
    }
  };

  const handleClick = async () => {
    if (!url || url.trim() === '') {
      unloadRepoInfo();
      return;
    } else if (!isValidGitHubRepoUrl(url)) {
      setError('This must be a valid GitHub repo URL');
    } else {
      setError(null);
    }

    sessionStorage.setItem('url', url);

    const { owner, repo } = parseGitHubRepoUrl(url);

    await loadRepoInfo(owner, repo);
  };

  return (
    <div className="flex gap-4">
      <Input
        type="url"
        placeholder="Enter repo URL"
        value={url}
        error={error}
        onChange={handleChange}
      />
      <Button variant="outline" onClick={handleClick}>
        Load issues
      </Button>
    </div>
  );
}
