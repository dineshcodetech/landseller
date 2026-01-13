import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-emerald-100 text-emerald-800",
        secondary:
          "border-transparent bg-slate-100 text-slate-800",
        destructive:
          "border-transparent bg-red-100 text-red-800",
        outline: "border-slate-200 text-slate-700",
        residential: "border-transparent bg-blue-100 text-blue-800",
        commercial: "border-transparent bg-purple-100 text-purple-800",
        agricultural: "border-transparent bg-green-100 text-green-800",
        industrial: "border-transparent bg-orange-100 text-orange-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
