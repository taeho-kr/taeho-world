import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const chipVariants = cva('border-t border-b px-2 flex items-center w-fit min-w-fit inline-flex', {
	variants: {
		variant: {
			default: '',
			destructive:
				'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
			outline:
				'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
			secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
			ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
			link: 'text-primary underline-offset-4 hover:underline',
		},
		size: {
			default: 'h-8 gap-2 px-3 py-2 has-[>svg]:px-3 text-[1rem]',
			sm: 'h-6 gap-1.5 px-3 has-[>svg]:px-2.5 text-[0.75rem]',
			lg: 'h-10 gap-2.5 px-6 has-[>svg]:px-4 text-1 text-[1.25rem]',
			icon: 'size-9',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

const Chip = ({
	className,
	variant = 'default',
	size,
	children,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof chipVariants>) => {
	return (
		<div
			className={cn(chipVariants({ variant, size, className }))}
			{...props}
		>
			{children}
		</div>
	);
};

export default Chip;
