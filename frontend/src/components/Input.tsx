import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col w-full gap-1.5 ${className}`}>
      <label
        htmlFor={id}
        className="text-xs font-semibold text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-3.5 py-2 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors ${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
        }`}
        {...props}
      />
      {error && (
        <span
          id={`${id}-error`}
          className="text-xs text-red-500 dark:text-red-400 mt-0.5"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};
export default Input;
