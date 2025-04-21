import { AxiosError } from 'axios';

const BAD_REQUEST_START = 'Bad request - ';
const INVALID_EMAIL_END = 'Invalid email';
const WEEK_PASSWORD_END = 'Week password';
const INVALID_NAME_END = 'Invalid name';

export const getErrorMessage = (error: unknown) =>
  error instanceof AxiosError
    ? (error.response?.data?.error ?? error.message)
    : typeof error === 'object' && error !== null && 'message' in error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'Unknown error';

export const isEmailError = (error: string) =>
  error?.trim() === `${BAD_REQUEST_START}${INVALID_EMAIL_END}`;

export const isPasswordError = (error: string) =>
  error?.trim() === `${BAD_REQUEST_START}${WEEK_PASSWORD_END}`;

export const isNameError = (error: string) =>
  error?.trim() === `${BAD_REQUEST_START}${INVALID_NAME_END}`;

export const isBadRequestError = (error: string) =>
  error?.trimStart().startsWith(BAD_REQUEST_START);

export const getBadRequestErrorMessage = (error: string) =>
  isBadRequestError(error) ? error?.trimStart().substring(BAD_REQUEST_START.length) : error;
