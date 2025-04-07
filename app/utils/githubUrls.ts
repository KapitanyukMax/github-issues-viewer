export function isValidGitHubRepoUrl(url: string) {
  const pattern = /^(https:\/\/|git@)github\.com[:\/][\w.-]+\/[\w.-]+(\.git)?$/i;
  return pattern.test(url);
}

export function parseGitHubRepoUrl(url: string) {
  const regex = /github\.com[:\/]([^\/]+)\/([^\/]+?)(?:\.git)?$/i;
  const match = url.match(regex);

  if (!match) {
    throw new Error('Invalid GitHub URL');
  }

  const owner = match[1];
  const repo = match[2];

  return { owner, repo };
}
