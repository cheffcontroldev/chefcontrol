import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ placeholder, disabled = false, readOnly = false, rows = 4, ...rest }, ref) => {
    return (
      <fieldset className="fieldset">
        <legend className="fieldset-legend px-1">{placeholder}</legend>
        <textarea
          className="w-full textarea"
          ref={ref}
          readOnly={readOnly}
          disabled={disabled}
          rows={rows}
          {...rest}
        ></textarea>
      </fieldset>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
