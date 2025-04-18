import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const count = 10;

const HomePage = () => {
	const [current, setCurrent] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => {
				if (prev === count) {
					clearInterval(interval);
				}
				return prev + 1;
			});
		}, Math.random() * 1000 + 250);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className='w-full h-full'>
			<div className='flex flex-col'>
				{new Array(current).fill(0).map((_, index) => (
					<Button
						className='w-2 h-2 p-0'
						variant='secondary'
						style={{ marginBottom: (index + 1) * 4 + 'px' }}
					/>
				))}
			</div>
		</div>
	);
};

export default HomePage;
