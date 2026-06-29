interface LogoProps {
	className?: string;
}

/**
 * TH monogram mark — the "T" and "H" set as two distinct geometric letters with
 * an even stroke, so it reads unmistakably as the initials. Uses `currentColor`,
 * inheriting the nav text color and any hover/transition on its container.
 */
export function Logo({ className }: LogoProps) {
	return (
		<svg
			viewBox="0 0 30 20"
			fill="none"
			aria-hidden="true"
			focusable="false"
			className={className}
		>
			<g
				stroke="currentColor"
				strokeWidth={2.2}
				strokeLinecap="square"
				strokeLinejoin="miter"
			>
				{/* T */}
				<path d="M2 3 H14" />
				<path d="M8 3 V17" />
				{/* H */}
				<path d="M19 3 V17" />
				<path d="M28 3 V17" />
				<path d="M19 10 H28" />
			</g>
		</svg>
	);
}
