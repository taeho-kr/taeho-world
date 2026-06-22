import { useEffect, useRef, useState } from 'react';

interface UseRevealOptions {
	/** IntersectionObserver visibility threshold (default 0.15) */
	threshold?: number;
	/** Reveal once then stop observing (default true) */
	once?: boolean;
	/** IntersectionObserver rootMargin (default trims 10% off the bottom so
	 *  elements reveal slightly before reaching the viewport edge) */
	rootMargin?: string;
}

/**
 * Tracks whether an element has scrolled into view. Pair with the `.reveal`
 * utilities in index.css to fade/slide content in on scroll. Honors
 * `prefers-reduced-motion` automatically (the CSS no-ops under reduced motion).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
	threshold = 0.15,
	once = true,
	rootMargin = '0px 0px -10% 0px',
}: UseRevealOptions = {}) {
	const ref = useRef<T>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					if (once) observer.disconnect();
				} else if (!once) {
					setVisible(false);
				}
			},
			{ threshold, rootMargin }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold, once, rootMargin]);

	return { ref, visible };
}
