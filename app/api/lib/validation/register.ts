import { RegisterDto } from '@/app/types/shared/dto/auth/RegisterDto';
import { isValidEmail, isStrongPassword } from './auth';

export function isRegisterDto(user: RegisterDto): user is RegisterDto {
  if (!user?.email || !user?.password || !user.name) {
    return false;
  }

  return (
    typeof user.email === 'string' &&
    typeof user.password === 'string' &&
    typeof user.name === 'string'
  );
}

export function validateRegisterDto(user: RegisterDto) {
  if (!isRegisterDto(user)) {
    return 'Missing credentials';
  }

  if (!isValidEmail(user.email)) {
    return 'Invalid email';
  }

  if (!isStrongPassword(user.password)) {
    return 'Week password';
  }

  if (user.name.length < 2 || user.name.length > 100) {
    return 'Invalid name';
  }

  return 'Valid';
}
