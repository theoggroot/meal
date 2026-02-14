import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white transition",
        "bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-lg shadow-fuchsia-500/25",
        "disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
