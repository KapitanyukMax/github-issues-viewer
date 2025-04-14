import { createSession, deleteSessionByToken, getSessionByToken } from '@/lib/repository/session';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@/lib/tokens';
import { Tokens } from '@/lib/tokens.types';

export async function refresh(oldRefreshToken: string): Promise<Tokens> {
  const { sub: userIdStr } = verifyRefreshToken(oldRefreshToken);
  if (!userIdStr) {
    throw new Error('Invalid refresh token');
  }

  const session = await getSessionByToken(oldRefreshToken);
  if (!session) {
    throw new Error('Invalid refresh token');
  }

  try {
    await deleteSessionByToken(oldRefreshToken);
  } catch {}

  if (session.expires_at < new Date()) {
    throw new Error('Expired refresh token');
  }

  const newAccessToken = generateAccessToken(userIdStr);
  const newRefreshToken = generateRefreshToken(userIdStr);

  await createSession(+userIdStr, newRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}
