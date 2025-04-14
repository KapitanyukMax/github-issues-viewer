import { Tokens } from '@/lib/tokens.types';

export interface UserInfo {
  id: number;
  email: string;
  name: string | null;
  role: string | null;
}

export interface SignInResult {
  tokens: Tokens;
  userInfo: UserInfo | null;
}
