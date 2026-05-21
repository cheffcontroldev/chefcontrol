import { forwardRef, type TextareaHTMLAttributes } from 'react';

/**
 * Props for the TextArea component.
 */
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
}

/**
 * Reusable textarea component with fieldset styling.
 * @description A styled textarea using DaisyUI fieldset for consistent form layout.
 * The placeholder is displayed as a fieldset legend above the textarea.
 *
 * @example
 * ```tsx
 * <TextArea
 *   placeholder="Dirección"
 *   rows={4}
 *   {...register('address')}
 * />
 * ```
 *
 * @param placeholder - Text used as fieldset legend and placeholder
 * @param disabled - Whether the textarea is disabled (default: false)
 * @param readOnly - Whether the textarea is read-only (default: false)
 * @param rows - Number of visible text rows (default: 4)
 * @param ref - React ref forwarded to the underlying textarea element
 */
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder, disabled = false, readOnly = false, rows = 4, ...rest }, ref) => {
    return (
      <div className="relative pb-5 w-full block">
        <label className="label pl-0.5 pb-0.5">
          <span className="label-text">{placeholder}</span>
        </label>
        <textarea
          className="w-full textarea"
          ref={ref}
          readOnly={readOnly}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          {...rest}
        ></textarea>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
