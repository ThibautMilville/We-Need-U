import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  success,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
          error
            ? 'border-error-300 focus:ring-error-500 focus:border-error-500'
            : success
            ? 'border-success-300 focus:ring-success-500 focus:border-success-500'
            : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  success,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        className={clsx(
          'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors resize-vertical',
          error
            ? 'border-error-300 focus:ring-error-500 focus:border-error-500'
            : success
            ? 'border-success-300 focus:ring-success-500 focus:border-success-500'
            : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

export default Input;