"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const ErrorMessage = React.forwardRef<HTMLSpanElement, ErrorMessageProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-red-500 text-sm", className)}
        {...props}
      />
    );
  }
);
ErrorMessage.displayName = "ErrorMessage";

export { ErrorMessage };
