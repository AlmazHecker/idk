import * as React from "react";

import { cn } from "@shared/lib/utils";
import { FieldError } from "react-hook-form";
import { ReactNode } from "react";

export type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: FieldError;
  containerClassName?: string;
  endIcon?: ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, containerClassName = "", label, error, endIcon, ...props },
    ref,
  ) => {
    return (
      <div className={cn("relative", containerClassName)}>
        {label && (
          <label className="inline-block mb-0.5 text-sm">{label}</label>
        )}
        <div className="relative">
          <input
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className,
            )}
            ref={ref}
            {...props}
          />
          {endIcon}
        </div>
        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
