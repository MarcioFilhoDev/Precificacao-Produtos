import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  children?: ReactNode;
}

export default function Input({ label, children, ...props }: InputProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#344139]">
        {label}
      </span>
      <input
        {...props}
        className="h-12 w-full rounded-xl border border-[#e3e8e2] bg-white px-4 text-sm text-[#27352d] outline-none transition placeholder:text-[#a7afa9] focus:border-[#6a9b73] focus:ring-4 focus:ring-[#dcebdd]/60"
      />

      {children}
    </label>
  );
}
