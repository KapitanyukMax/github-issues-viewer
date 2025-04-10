import prisma from '@/lib/prisma';
import { addDays } from 'date-fns';

export async function storeRefreshToken(
  userId: number,
  token: string,
  expiresInDays = 7,
  meta?: { userAgent?: string; ipAddress?: string }
) {
  return prisma.session.create({
    data: {
      user_id: userId,
      session_token: token,
      expires_at: addDays(new Date(), expiresInDays),
      ...meta,
    },
  });
}

export async function getRefreshTokenByToken(token: string) {
  return prisma.session.findUnique({ where: { session_token: token } });
}

export async function revokeRefreshToken(token: string) {
  return prisma.session.delete({ where: { session_token: token } });
}
