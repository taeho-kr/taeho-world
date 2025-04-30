import useThree from '@/hooks/useThree';
import { useEffect, useRef } from 'react';

const HomePage = () => {
	const cubeContainer = useRef<HTMLDivElement | null>(null);
	const { threeCube } = useThree();

	useEffect(() => {
		threeCube(cubeContainer.current);
	}, []);

	return (
		<div
			className='w-full h-full'
			ref={cubeContainer}
		></div>
	);
};

export default HomePage;
