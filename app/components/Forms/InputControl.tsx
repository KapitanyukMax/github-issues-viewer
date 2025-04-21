import { cn } from '@/lib/utils';
import { useField } from 'formik';
import { Label } from '../ui/label';
import { ValidatedInput } from './ValidatedInput';

export type InputControlProps = Omit<
  React.ComponentProps<'input'> & { label: string },
  'value' | 'onChange' | 'onBlur'
>;

export function InputControl({ id, label, ...props }: InputControlProps) {
  const [field, meta] = useField({ ...props, id });

  const isError = (meta.touched && meta.error) as boolean;
  const error = isError ? meta.error : null;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className={cn(isError && 'text-red-500')}>
        {label}
      </Label>
      <ValidatedInput id={id} {...field} {...props} error={error} />
    </div>
  );
}
