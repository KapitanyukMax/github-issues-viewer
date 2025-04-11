'use client';
import { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadRepoInfo, clearRepoInfo } from '@/lib/store/github';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidGitHubRepoUrl, parseGitHubRepoUrl } from '@/app/utils/githubUrls';
import { AppDispatch } from '@/lib/store';

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const savedUrl = sessionStorage.getItem('url');
    if (!savedUrl) return;

    if (!isValidGitHubRepoUrl(savedUrl)) {
      setUrl('');
      setError(null);
      return;
    }

    setUrl(savedUrl);
    sessionStorage.setItem('url', savedUrl);

    const { owner, repo } = parseGitHubRepoUrl(savedUrl);
    dispatch(loadRepoInfo(owner, repo, false));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);

    if (error) {
      setError(null);
    }
  };

  const handleClick = async () => {
    if (!url || url.trim() === '') {
      dispatch(clearRepoInfo());
      return;
    } else if (!isValidGitHubRepoUrl(url)) {
      setError('This must be a valid GitHub repo URL');
    } else {
      setError(null);
    }

    sessionStorage.setItem('url', url);

    const { owner, repo } = parseGitHubRepoUrl(url);

    dispatch(loadRepoInfo(owner, repo, false));
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
