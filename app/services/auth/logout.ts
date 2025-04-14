import { deleteSessionByToken } from '@/lib/repository/session';

export async function logout(refreshToken: string | null) {
  try {
    if (refreshToken) await deleteSessionByToken(refreshToken);
    return true;
  } catch {
    return false;
  }
}
