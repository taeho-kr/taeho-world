import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const chipVariants = cva(
  "border border-[var(--accent-foreground)] bg-[var(--accent)] text-[var(--accent-foreground)] rounded-md px-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Chip = ({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof chipVariants>) => {
  return (
    <div className={cn(chipVariants({ variant, size, className }))} {...props}>
      {children}
    </div>
  );
};

export default Chip;
