import { GitHubIssue, IssueInfo, RepoInfo } from '../types/github';

function formatNumber(n: number): string {
  if (n < 1000) return n.toString();
  if (n < 1_000_000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
  return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' M';
}

function getCacheKey(owner: string, repo: string) {
  return `gh-issues-${owner}-${repo}`;
}

function getTimeDiffStr(fromDate: Date, toDate: Date) {
  const isFuture = fromDate > toDate;
  let start = isFuture ? toDate : fromDate;
  let end = isFuture ? fromDate : toDate;

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  let res;
  if (years > 0) {
    res = `${years} year${years !== 1 ? 's' : ''}`;
  }
  if (months > 0) {
    res = `${months} month${months !== 1 ? 's' : ''}`;
  }
  if (days > 0) {
    res = `${days} day${days !== 1 ? 's' : ''}`;
  }
  if (res) {
    return isFuture ? `in ${res}` : `${res} ago`;
  }

  const msDiff = Math.abs(toDate.getTime() - fromDate.getTime());
  const timePartMs = msDiff % (1000 * 60 * 60 * 24);

  const hours = Math.floor(timePartMs / (1000 * 60 * 60));
  const minutes = Math.floor((timePartMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    res = `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    res = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
  res ||= 'a moment';

  return isFuture ? `in ${res}` : `${res} ago`;
}

function getIssueStateInfo(issue: IssueInfo) {
  const now = new Date();
  const time_str = issue.state === 'closed' ? issue.closed_at! : issue.created_at;
  const time = new Date(time_str);
  return `${issue.state} ${getTimeDiffStr(time, now)}`;
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

async function getRepoInfo(owner: string, repo: string): Promise<RepoInfo> {
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

export { getCacheKey, getRepoInfo, getIssueStateInfo };
