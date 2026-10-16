import { QuestionIcon } from "@phosphor-icons/react";
import { useId, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  children?: ReactNode;
}

interface InputLabelProps {
  label: string;
  helpText?: string;
  htmlFor?: string;
  helpId?: string;
}

export function InputLabel({
  label,
  helpText,
  htmlFor,
  helpId: providedHelpId,
}: InputLabelProps) {
  const generatedHelpId = useId();
  const helpId = providedHelpId ?? generatedHelpId;

  return (
    <div className="mb-2 flex items-center gap-1.5">
      {htmlFor ? (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-content-label"
        >
          {label}
        </label>
      ) : (
        <span className="text-sm font-medium text-content-label">{label}</span>
      )}
      {helpText && (
        <span className="group relative inline-flex">
          <button
            type="button"
            aria-label={`Ajuda: ${label}`}
            aria-describedby={helpId}
            title={helpText}
            className="inline-flex size-5 items-center justify-center rounded-full text-content-faint transition hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            <QuestionIcon size={16} weight="bold" aria-hidden="true" />
          </button>
          <span
            id={helpId}
            role="tooltip"
            className="invisible absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-lg bg-content-heading px-3 py-2 text-xs font-normal leading-5 text-white opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
          >
            {helpText}
          </span>
        </span>
      )}
    </div>
  );
}

export default function Input({ label, helpText, children, ...props }: InputProps) {
  const inputId = useId();
  const id = props.id ?? inputId;
  const helpId = `${id}-help`;

  return (
    <div>
      {label && (
        <InputLabel
          label={label}
          helpText={helpText}
          htmlFor={id}
          helpId={helpId}
        />
      )}
      <input
        {...props}
        id={id}
        aria-describedby={
          helpText
            ? `${props["aria-describedby"] ?? ""} ${helpId}`.trim()
            : props["aria-describedby"]
        }
        className="h-12 w-full rounded-xl border border-line bg-surface px-4 text-sm text-content-strong outline-none transition placeholder:text-content-placeholder focus:border-brand-500 focus:ring-4 focus:ring-brand-200/60"
      />

      {children}
    </div>
  );
}
