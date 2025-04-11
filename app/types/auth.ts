export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
}
