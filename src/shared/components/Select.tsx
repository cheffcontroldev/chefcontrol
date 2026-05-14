import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Record<string, string>;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, errorMessage, disabled = false, ...rest }, ref) => {
    const hasError = !!errorMessage;

    return (
      <div className="relative pb-5 w-full block">
        <select className="select w-full" ref={ref} disabled={disabled} defaultValue="" {...rest}>
          <option value="" disabled>
            {placeholder}
          </option>
          {Object.entries(options).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
        {hasError && (
          <div className="absolute bottom-0 left-0 right-0 text-[0.75rem] text-red-500">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
