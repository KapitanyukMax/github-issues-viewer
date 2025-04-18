import { UserInfo } from '@/app/types/shared/UserInfo';

export interface ProfileInfoProps {
  user: UserInfo;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  return <p className="font-semibold">{user.name}</p>;
}
