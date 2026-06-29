import { useEffect, useState } from 'react';
import { useReveal } from './useReveal';

interface UseCountUpOptions {
	/** Animation duration in ms (default 1200) */
	duration?: number;
	/** Decimal places to render (default 0) */
	decimals?: number;
}

/**
 * Counts a number up from 0 to `end` once it scrolls into view. Honors
 * `prefers-reduced-motion` by jumping straight to `end`. Returns a ref to
 * attach to the displayed element and the formatted current value.
 */
export function useCountUp(end: number, { duration = 1200, decimals = 0 }: UseCountUpOptions = {}) {
	const { ref, visible } = useReveal<HTMLSpanElement>();
	const [value, setValue] = useState(0);

	useEffect(() => {
		if (!visible) return;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || duration <= 0) {
			setValue(end);
			return;
		}

		let raf = 0;
		let startTs: number | null = null;
		const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

		const tick = (ts: number) => {
			if (startTs === null) startTs = ts;
			const progress = Math.min((ts - startTs) / duration, 1);
			setValue(end * easeOutExpo(progress));
			if (progress < 1) raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [visible, end, duration]);

	const formatted = value.toLocaleString('en-US', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});

	return { ref, value: formatted };
}
