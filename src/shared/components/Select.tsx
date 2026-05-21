import { forwardRef, type SelectHTMLAttributes } from 'react';

/**
 * Props for the Select component.
 * @extends SelectHTMLAttributes<HTMLSelectElement>
 */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Record of key-value pairs for dropdown options */
  options: Record<string, string>;
  /** Placeholder text for the default disabled option */
  placeholder: string;
  /** Validation error message shown below the select */
  errorMessage?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Show loading state while options are being fetched */
  isLoadingOptions?: boolean;
  /** Show error state when options failed to load */
  isErrorOptions?: boolean;
}

/**
 * Reusable dropdown select with loading, error, and validation states.
 * @description A styled select field displaying options from a Record<string, string>.
 * Supports three states: loading (shows "Cargando..."), error (shows error message),
 * and normal (renders placeholder + options).
 *
 * @example
 * ```tsx
 * <Select
 *   options={roleOptions}
 *   placeholder="Seleccionar rol"
 *   errorMessage={errors.role?.message}
 *   isLoadingOptions={isLoadingRoles}
 *   {...register('role')}
 * />
 * ```
 *
 * @param options - Options as a Record<value, label>
 * @param placeholder - Placeholder for the default option
 * @param errorMessage - Validation error message (shows if present)
 * @param disabled - Disables the select (default: false)
 * @param isLoadingOptions - Shows "Cargando..." when true (default: false)
 * @param isErrorOptions - Shows error message when true (default: false)
 * @param ref - React ref forwarded to the select element
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      errorMessage,
      disabled = false,
      isLoadingOptions = false,
      isErrorOptions = false,
      ...rest
    },
    ref
  ) => {
    const hasError = !!errorMessage;

    return (
      <div className="relative pb-5 w-full block">
        <label className="label pl-0.5 pb-0.5">
          <span className="label-text">{placeholder}</span>
        </label>
        <select className="select w-full" ref={ref} disabled={disabled} defaultValue="" {...rest}>
          {isLoadingOptions && (
            <option value="" disabled>
              Cargando...
            </option>
          )}
          {isErrorOptions && (
            <option value="" disabled>
              Error al cargar opciones
            </option>
          )}
          {!isLoadingOptions && !isErrorOptions && (
            <>
              <option value="" disabled>
                Selecciona {placeholder}
              </option>
              {Object.entries(options).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </>
          )}
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
