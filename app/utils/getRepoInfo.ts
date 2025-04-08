import { GitHubIssue, IssueInfo, RepoInfo } from '../types/github';

function formatNumber(n: number): string {
  if (n < 1000) return n.toString();
  if (n < 1_000_000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
  return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' M';
}

function getCacheKey(owner: string, repo: string) {
  return `gh-issues-${owner}-${repo}`;
}

function loadFromCache(owner: string, repo: string): RepoInfo | null {
  try {
    const raw = localStorage.getItem(getCacheKey(owner, repo));
    if (!raw) return null;
    return JSON.parse(raw) as RepoInfo;
  } catch (err) {
    console.warn('Failed to read cache:', err);
    return null;
  }
}

async function fetchGitHubIssues(owner: string, repo: string): Promise<IssueInfo[]> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`);
  const issues = (await res.json()) as GitHubIssue[];
  const issuesInfo: IssueInfo[] = issues.map(issue => ({
    ...issue,
    status: 'to-do',
  }));

  return issuesInfo;
}

async function fetchRepoStars(owner: string, repo: string): Promise<string> {
  const url = `https://api.github.com/repos/${owner}/${repo}`;

  const response = await fetch(url);
  const data = (await response.json()) as { stargazers_count: number };
  console.log(data);

  return formatNumber(data.stargazers_count);
}

export async function getRepoInfo(owner: string, repo: string): Promise<RepoInfo> {
  const cached = loadFromCache(owner, repo);
  if (cached) {
    return cached;
  }

  const issuesInfo = await fetchGitHubIssues(owner, repo);
  const repoStars = await fetchRepoStars(owner, repo);
  const repoInfo: RepoInfo = {
    owner,
    repo,
    stars: repoStars,
    issues: issuesInfo,
  };

  localStorage.setItem(getCacheKey(owner, repo), JSON.stringify(repoInfo));
  return repoInfo;
}
