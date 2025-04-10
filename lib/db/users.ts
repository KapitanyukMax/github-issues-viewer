import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const USER_ROLE_ID = 1;

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email }, include: { role: true } });
}

export async function findUserById(id: number) {
  return prisma.user.findUnique({ where: { id }, include: { role: true } });
}

export async function createUser(email: string, password: string, name: string) {
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password_hash: hashed,
      name: name,
      role_id: USER_ROLE_ID,
    },
    include: {
      role: true,
    },
  });
  return user;
}
