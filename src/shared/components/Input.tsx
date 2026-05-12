import { forwardRef, type InputHTMLAttributes } from 'react';
import { Mail, RectangleEllipsis, TextCursorInput, type LucideIcon } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'email' | 'text' | 'password' | 'url';
  placeholder: string;
  errorMessage?: string;
}

const iconMap: Record<InputProps['type'], LucideIcon> = {
  email: Mail,
  password: RectangleEllipsis,
  url: TextCursorInput,
  text: TextCursorInput,
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, errorMessage, ...rest }, ref) => {
    const Icon = iconMap[type];
    const hasError = !!errorMessage;

    return (
      <div className="relative pb-5 w-full block">
        <label className="input w-full">
          <Icon className="size-4" />
          <input className="w-full" ref={ref} type={type} placeholder={placeholder} {...rest} />
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
