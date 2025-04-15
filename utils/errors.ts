import { AxiosError } from 'axios';

const BAD_REQUEST_START = 'Bad request - ';
const INVALID_EMAIL_END = 'Invalid email';

export const getErrorMessage = (error: unknown) =>
  error instanceof AxiosError
    ? (error.response?.data?.error ?? error.message)
    : error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'Unknown error';

export const isEmailError = (error: string) =>
  error?.trim() === `${BAD_REQUEST_START}${INVALID_EMAIL_END}`;

export const isBadRequestError = (error: string) =>
  error?.trimStart().startsWith(BAD_REQUEST_START);

export const getBadRequestErrorMessage = (error: string) =>
  isBadRequestError(error) ? error?.trimStart().substring(BAD_REQUEST_START.length) : error;
