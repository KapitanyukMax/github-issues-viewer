import { Input, InputProps } from './input';
import { Button } from './button';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export type PasswordInputProps = Omit<InputProps, 'type'>;

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, className, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={show ? 'text' : 'password'}
          placeholder="Enter your password"
          error={error}
          className={cn(className, 'pr-10')}
          {...props}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => setShow(!show)}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
        >
          {show ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
      </div>
    );
  }
);
