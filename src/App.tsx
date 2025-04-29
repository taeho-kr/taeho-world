import { Route, Routes } from 'react-router';
import routes from '@/routes';
import Header from './layouts/Header';
import Nav from './layouts/Nav';
import Footer from './layouts/Footer';
import Contents from './layouts/Contents';
import useLayout from './hooks/useLayout';
import { useEffect, useRef } from 'react';
import { cn } from './lib/utils';
import useThree from './hooks/useThree';

function App() {
	const { isMobile, doNotAnimate, checkRenderHistory } = useLayout();
	const contentsContainer = useRef<HTMLDivElement | null>(null);
	const cubeContainer = useRef<HTMLDivElement | null>(null);
	const { threeWave, threeCube } = useThree();

	useEffect(() => {
		threeCube(cubeContainer.current);
		threeWave(contentsContainer.current);
	}, []);

	useEffect(() => {
		checkRenderHistory();
	}, []);

	return (
		<div className='w-full h-full p-4 lg:p-8 flex flex-col max-w-[1300px]'>
			<div
				className={cn(
					'w-full flex flex-1 relative border max-h-[100%] overflow-hidden rounded-md relative',
					isMobile ? 'flex-col' : 'flex-row'
				)}
			>
				<div
					ref={contentsContainer}
					className='absolute w-full h-full opacity-20 z-[-1]'
				/>
				<div
					className='absolute w-full h-full opacity-50 z-[-1]'
					ref={cubeContainer}
				/>
				<div className={isMobile ? 'flex flex-row justify-between items-center py-3 px-5' : 'mt-10 ml-8'}>
					<Header animate={!doNotAnimate} />
					<Nav animate={!doNotAnimate} />
				</div>
				<Contents animate={!doNotAnimate}>
					<Routes>
						{routes.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={route.element}
							/>
						))}
					</Routes>
				</Contents>
			</div>
			<Footer />
		</div>
	);
}

export default App;
