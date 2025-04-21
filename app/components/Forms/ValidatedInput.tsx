import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { PasswordInput } from './PasswordInput';

export type ValidatedInputProps = React.ComponentProps<'input'> & {
  error?: string | null;
};

export function ValidatedInput({ error, className, type, ...props }: ValidatedInputProps) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      {type === 'password' ? (
        <PasswordInput
          className={cn(error ? 'border-red-500' : 'border-gray-300', className)}
          {...props}
        />
      ) : (
        <Input
          type={type}
          className={cn(error ? 'border-red-500' : 'border-gray-300', className)}
          {...props}
        />
      )}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
