import type { InputHTMLAttributes, ReactNode } from "react";

interface IngredientProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

export default function Ingredient({ children, ...props }: IngredientProps) {
  return (
    <td className="p-2">
      <input
        {...props}
        className="h-10 w-full min-w-0 rounded-lg border border-line bg-surface px-3 text-sm text-content-strong outline-none transition placeholder:text-content-placeholder focus:border-brand-500 focus:ring-4 focus:ring-brand-200/60"
        placeholder="Ex.: Farinha"
      />

      {children}
    </td>
  );
}
