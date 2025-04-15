import { Tokens } from '@/lib/helpers/tokens.types';
import { UserInfo } from '@/types/shared/UserInfo';

export interface SignInResult {
  tokens: Tokens;
  userInfo: UserInfo | null;
}
