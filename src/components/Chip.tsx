import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChipProps {
	children: ReactNode;
	className?: string;
}

/** Unified tech-stack chip — one source of truth across Projects, the modal, and SideProjects. */
export function Chip({ children, className }: ChipProps) {
	return (
		<span
			className={cn(
				'inline-block rounded-sm border border-white/[0.08] px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.04em] text-fg-muted',
				className
			)}
		>
			{children}
		</span>
	);
}
