import appStore from '@/store/appStore';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface ContentsProps {
	children: React.ReactNode;
	animate: boolean;
}

const Contents = ({ children, animate }: ContentsProps) => {
	const { navRendered } = appStore();
	const $container = useRef<HTMLDivElement | null>(null);
	const [maxHeight, setMaxHeight] = useState<number>(99999);

	const mountRef = useCallback((node: HTMLDivElement | null) => {
		if (node) {
			$container.current = node;
			const height = node.clientHeight;
			setMaxHeight(height);
		}
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleResize = () => {
		setMaxHeight(99999);
		setTimeout(() => {
			if ($container.current) setMaxHeight($container.current.clientHeight);
		});
	};

	if (!navRendered && animate) {
		return null;
	}

	return (
		<main
			ref={mountRef}
			className='w-full flex-1 animate-fadeIn'
			style={{
				maxHeight: maxHeight + 'px',
				overflowY: 'auto',
			}}
		>
			{children}
		</main>
	);
};

export default Contents;
