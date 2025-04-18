import prisma from '@/lib/prisma';
import { Session } from '@/app/types/model/auth/Session';
import { addDays } from 'date-fns';

export async function createSession(
  userId: number,
  token: string,
  expiresInDays = 7
): Promise<Session> {
  return prisma.session.create({
    data: {
      user_id: userId,
      session_token: token,
      expires_at: addDays(new Date(), expiresInDays),
    },
  });
}

export async function getSessionByToken(token: string): Promise<Session | null> {
  return prisma.session.findUnique({ where: { session_token: token } });
}

export async function deleteSessionByToken(token: string): Promise<Session> {
  return prisma.session.delete({ where: { session_token: token } });
}
