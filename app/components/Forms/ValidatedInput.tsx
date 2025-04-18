import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { PasswordInput } from './PasswordInput';

export type ValidatedInputProps = React.ComponentProps<'input'> & {
  error?: string | null;
};

export function ValidatedInput({ error, className, type, ...props }: ValidatedInputProps) {
  const InputComponent =
    type === 'password'
      ? PasswordInput
      : ({ ...props }: Omit<ValidatedInputProps, 'type'>) => <Input type={type} {...props} />;

  return (
    <div className="flex flex-col space-y-1 w-full">
      <InputComponent
        className={cn(error ? 'border-red-500' : 'border-gray-300', className)}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
