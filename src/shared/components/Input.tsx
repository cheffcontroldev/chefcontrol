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

/**
 * Props for the Input component.
 * @extends InputHTMLAttributes<HTMLInputElement>
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** HTML input type — determines which icon is displayed */
  type: 'email' | 'text' | 'password' | 'url' | 'number' | 'date' | 'tel';
  /** Placeholder text displayed inside the input */
  placeholder: string;
  /** Validation error message shown below the input */
  errorMessage?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
}

/** Maps input types to their corresponding Lucide icons. */
const iconMap: Record<InputProps['type'], LucideIcon> = {
  email: Mail,
  password: RectangleEllipsis,
  url: TextCursorInput,
  text: TextCursorInput,
  number: Hash,
  date: CalendarDays,
  tel: Phone,
};

/**
 * Reusable input field with icon and error display.
 * @description A styled input with a contextual icon on the left side
 * and an optional error message below. Wraps DaisyUI's input component.
 *
 * @example
 * ```tsx
 * <Input
 *   type="email"
 *   placeholder="Email"
 *   errorMessage={errors.email?.message}
 *   {...register('email')}
 * />
 * ```
 *
 * @param type - HTML input type (determines icon)
 * @param placeholder - Placeholder text
 * @param errorMessage - Validation error message (shows if present)
 * @param disabled - Disables the input (default: false)
 * @param readOnly - Makes the input read-only (default: false)
 * @param ref - React ref forwarded to the input element
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, errorMessage, disabled = false, readOnly = false, ...rest }, ref) => {
    const Icon = type === 'date' ? CalendarDays : iconMap[type];
    const hasError = !!errorMessage;

    return (
      <div className="relative pb-5 w-full block">
        <label className="label pl-0.5 pb-0.5">
          <span className="label-text">{placeholder}</span>
        </label>
        <div className="input w-full">
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
        </div>
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
