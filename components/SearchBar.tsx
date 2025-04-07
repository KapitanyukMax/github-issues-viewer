'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { useIssues } from '@/app/context/IssuesContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidGitHubRepoUrl, parseGitHubRepoUrl } from '@/app/utils/githubUrls';

export default function SearchBar() {
  const { loadIssues, issues } = useIssues();
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);

    if (error) {
      setError(null);
    }
  };

  const handleClick = async () => {
    if (!url || url.trim() === '') {
      setError('The URL cannot be empty');
    } else if (!isValidGitHubRepoUrl(url)) {
      setError('This must be a valid GitHub repo URL');
    } else {
      setError(null);
    }

    const { owner, repo } = parseGitHubRepoUrl(url);

    await loadIssues(owner, repo);
  };

  useEffect(() => {
    console.log(issues);
  }, [issues]);

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
