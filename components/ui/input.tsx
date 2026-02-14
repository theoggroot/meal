import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn("glass w-full rounded-xl px-4 py-3 outline-none", className)}
      {...props}
    />
  )
);
Input.displayName = "Input";
