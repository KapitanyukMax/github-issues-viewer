export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  body: string;
  user: {
    login: string;
    html_url: string;
  };
  repository_url: string;
  labels: {
    id: number;
    name: string;
    color: string;
  }[];
}
