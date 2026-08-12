import { cloneElement } from "react";
import { cn } from "../lib/utils";

const variantClasses = {
  default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
  destructive:
    "bg-destructive-100 text-white shadow-xs hover:bg-destructive-200",
  outline:
    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeClasses = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md gap-1.5 px-3",
  lg: "h-10 rounded-md px-6",
  icon: "size-9",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  // asChild lets a single child element (e.g. a <Link>) receive the button styling,
  // mirroring the Radix Slot behaviour used in the original shadcn Button.
  if (asChild && children) {
    return cloneElement(children, {
      className: cn(children.props.className, classes),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
