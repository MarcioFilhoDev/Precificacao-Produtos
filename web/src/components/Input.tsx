import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  children?: ReactNode;
}

export default function Input({ label, children, ...props }: InputProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-content-label">
        {label}
      </span>
      <input
        {...props}
        className="h-12 w-full rounded-xl border border-line bg-surface px-4 text-sm text-content-strong outline-none transition placeholder:text-content-placeholder focus:border-brand-500 focus:ring-4 focus:ring-brand-200/60"
      />

      {children}
    </label>
  );
}
