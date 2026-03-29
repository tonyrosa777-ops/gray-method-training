"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm text-gray-text-2 font-body"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 rounded-lg font-body text-gray-text text-base",
            "bg-gray-elevated border border-white/10",
            "placeholder:text-gray-muted",
            "focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30",
            "transition-colors duration-200",
            error ? "border-orange-accent/60 focus:border-orange-accent/80" : "",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-orange-accent font-body">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-gray-muted font-body">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

/* ---- Textarea ---- */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, rows = 5, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm text-gray-text-2 font-body"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={cn(
            "w-full px-4 py-3 rounded-lg font-body text-gray-text text-base resize-y",
            "bg-gray-elevated border border-white/10",
            "placeholder:text-gray-muted",
            "focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30",
            "transition-colors duration-200",
            error ? "border-orange-accent/60" : "",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-orange-accent font-body">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-gray-muted font-body">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
