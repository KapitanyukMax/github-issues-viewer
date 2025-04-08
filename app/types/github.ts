export type IssueStatus = 'to-do' | 'in-progress' | 'done';

export interface GitHubIssue {
  title: string;
  number: number;
  state: 'open' | 'closed';
  created_at: string;
  closed_at: string | null;
  user: {
    login: string;
  };
  comments: number;
}

export interface IssueInfo extends GitHubIssue {
  status: IssueStatus;
}

export interface RepoInfo {
  owner: string;
  repo: string;
  stars: string;
  issues: IssueInfo[];
}
