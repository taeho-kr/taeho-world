import { useCountUp } from '@/hooks/useCountUp';

interface CountUpProps {
	end: number;
	decimals?: number;
	prefix?: string;
	suffix?: string;
}

/** Renders a number that counts up from 0 to `end` when scrolled into view. */
export function CountUp({ end, decimals = 0, prefix = '', suffix = '' }: CountUpProps) {
	const { ref, value } = useCountUp(end, { decimals });

	return (
		<span ref={ref} className="tabular-nums">
			{prefix}
			{value}
			{suffix}
		</span>
	);
}
