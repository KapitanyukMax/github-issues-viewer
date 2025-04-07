import { GitHubIssue } from '../types/github';

function getCacheKey(owner: string, repo: string) {
  return `gh-issues-${owner}-${repo}`;
}

function loadFromCache(owner: string, repo: string): GitHubIssue[] | null {
  try {
    const raw = localStorage.getItem(getCacheKey(owner, repo));
    if (!raw) return null;
    return JSON.parse(raw) as GitHubIssue[];
  } catch (err) {
    console.warn('Failed to read cache:', err);
    return null;
  }
}

async function getGitHubIssues(owner: string, repo: string): Promise<GitHubIssue[]> {
  const cached = loadFromCache(owner, repo);
  if (cached) {
    return cached;
  }

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`);
  const issues = (await res.json()) as GitHubIssue[];

  localStorage.setItem(getCacheKey(owner, repo), JSON.stringify(issues));

  return issues;
}

export default getGitHubIssues;
