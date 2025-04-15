import { UserInfo } from '@/types/shared/UserInfo';

export interface ProfileInfoProps {
  user: UserInfo;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  return <p className="font-semibold">{user.name}</p>;
}
