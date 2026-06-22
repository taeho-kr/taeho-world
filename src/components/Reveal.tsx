import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
	children: ReactNode;
	className?: string;
	/** Delay (ms) before the transition starts — use to stagger sibling items. */
	delay?: number;
}

/**
 * Fades + slides its children in once they scroll into view.
 * Under `prefers-reduced-motion: reduce` the animation is skipped and content
 * renders immediately (see the `.reveal` rules in index.css).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
	const { ref, visible } = useReveal();

	return (
		<div
			ref={ref}
			className={cn('reveal', visible && 'reveal-visible', className)}
			style={delay ? { transitionDelay: `${delay}ms` } : undefined}
		>
			{children}
		</div>
	);
}
