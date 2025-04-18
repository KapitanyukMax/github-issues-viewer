import { Tokens } from '@/app/api/lib/helpers/tokens.types';
import { UserInfo } from '@/app/types/shared/UserInfo';

export interface SignInResult {
  tokens: Tokens;
  userInfo: UserInfo | null;
}
