import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useReveal } from '@/hooks/useReveal';

type RevealVariant = 'fade' | 'up' | 'right';

interface RevealProps {
	children: ReactNode;
	className?: string;
	/** Delay (ms) before the transition starts — use to stagger sibling items. */
	delay?: number;
	/**
	 * Reveal direction, encoding the element's reading axis:
	 * `fade` (default) slides up a little, `up` travels farther (cards/headlines),
	 * `right` slides in from the margin (side columns, list items, tiles).
	 */
	variant?: RevealVariant;
	/** IntersectionObserver visibility threshold (default 0.15). */
	threshold?: number;
}

const VARIANT_CLASS: Record<RevealVariant, string> = {
	fade: 'reveal',
	up: 'reveal-up',
	right: 'reveal-right',
};

/**
 * Fades + slides its children in once they scroll into view.
 * Under `prefers-reduced-motion: reduce` the animation is skipped and content
 * renders immediately (see the `.reveal*` rules in index.css).
 */
export function Reveal({ children, className, delay = 0, variant = 'fade', threshold }: RevealProps) {
	const { ref, visible } = useReveal(threshold !== undefined ? { threshold } : undefined);

	return (
		<div
			ref={ref}
			className={cn(VARIANT_CLASS[variant], visible && 'reveal-visible', className)}
			style={delay ? { transitionDelay: `${delay}ms` } : undefined}
		>
			{children}
		</div>
	);
}
