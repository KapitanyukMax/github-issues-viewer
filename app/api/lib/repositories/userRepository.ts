import prisma from '@/lib/prisma';
import { UserWithRole } from '@/app/types/model/auth/User';

const USER_ROLE_ID = 1;

export async function getUserByEmail(email: string): Promise<UserWithRole | null> {
  return prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });
}

export async function getUserById(id: number): Promise<UserWithRole | null> {
  return prisma.user.findUnique({
    where: { id },
    include: { role: true },
  });
}

export async function createUser(
  email: string,
  password_hash: string,
  name: string
): Promise<UserWithRole> {
  return prisma.user.create({
    data: {
      email,
      password_hash,
      name: name,
      role_id: USER_ROLE_ID,
    },
    include: {
      role: true,
    },
  });
}
