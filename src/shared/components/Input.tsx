import { forwardRef, type InputHTMLAttributes } from 'react';
import {
  CalendarDays,
  Hash,
  Mail,
  Phone,
  RectangleEllipsis,
  TextCursorInput,
  type LucideIcon,
} from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'email' | 'text' | 'password' | 'url' | 'number' | 'date' | 'tel';
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const iconMap: Record<InputProps['type'], LucideIcon> = {
  email: Mail,
  password: RectangleEllipsis,
  url: TextCursorInput,
  text: TextCursorInput,
  number: Hash,
  date: CalendarDays,
  tel: Phone,
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, errorMessage, disabled = false, readOnly = false, ...rest }, ref) => {
    const Icon = type === 'date' ? CalendarDays : iconMap[type];
    const hasError = !!errorMessage;

    return (
      <div className="relative pb-5 w-full block">
        <label className="input w-full">
          <Icon className="size-4" />
          <input
            className="w-full"
            ref={ref}
            type={type}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            {...rest}
          />
        </label>
        {hasError && (
          <div className="absolute bottom-0 left-0 right-0 text-[0.75rem] text-red-500">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
