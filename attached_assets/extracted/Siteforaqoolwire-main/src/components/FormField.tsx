import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

interface BaseFieldProps {
  label: string;
  error?: string;
  helper?: string;
}

interface InputFieldProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {}

export function InputField({ label, error, helper, className = '', ...props }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-text">{label}</label>
      <input
        className={`w-full bg-surface border border-border rounded-[12px] px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {helper && <p className="text-sm text-muted">{helper}</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

interface TextareaFieldProps extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextareaField({ label, error, helper, className = '', ...props }: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-text">{label}</label>
      <textarea
        className={`w-full bg-surface border border-border rounded-[12px] px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none ${
          error ? 'border-red-500' : ''
        } ${className}`}
        rows={4}
        {...props}
      />
      {helper && <p className="text-sm text-muted">{helper}</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

interface SelectFieldProps extends BaseFieldProps, SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export function SelectField({ label, error, helper, options, className = '', ...props }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-text">{label}</label>
      <select
        className={`w-full bg-surface border border-border rounded-[12px] px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helper && <p className="text-sm text-muted">{helper}</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
