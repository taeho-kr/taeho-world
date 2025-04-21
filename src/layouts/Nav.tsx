import { cn } from '@/lib/utils';
import routes from '@/routes';
import appStore from '@/store/appStore';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';

const RENDER_DELAY = 250; // ms
const ANIMATE_DURATION = 1000; // ms

const Nav = ({ animate }: { animate: boolean }) => {
	const { headerRendered, setNavRendered } = appStore();
	const [render, setRender] = useState<boolean>(!animate);
	const renderTimeout = useRef<NodeJS.Timeout | null>(null);

	const location = useLocation();
	const currentPath = location.pathname;
	const currentRoute = routes.find((route) => route.path === currentPath);

	const { t } = useTranslation();

	useEffect(() => {
		if (!headerRendered) return;

		setTimeout(() => {
			setRender(true);
			if (renderTimeout.current) clearTimeout(renderTimeout.current);

			renderTimeout.current = setTimeout(() => {
				setNavRendered(true);
			}, ANIMATE_DURATION);
		}, RENDER_DELAY);

		return () => {
			if (renderTimeout.current) clearTimeout(renderTimeout.current);
		};
	}, [headerRendered]);

	if (!render && animate) return null;

	return (
		<nav
			className={cn('h-fit w-fit md:mt-10', {
				'animate-fadeInTop': animate,
			})}
			style={{ animationDuration: `${ANIMATE_DURATION}ms` }}
		>
			<div className='flex flex-row md:!flex-col gap-2'>
				{routes.map((route) => (
					<div
						key={route.path}
						className={cn('mb-2 relative border-b w-[fit-content]', {
							'border-b-[transparent]': currentRoute?.path !== route.path,
							'hover:border-b-[var(--muted)] hover:text-[var(--muted)]':
								currentRoute?.path !== route.path,
							'border-b-[var(--foreground)]': currentRoute?.path === route.path,
							'slease-in-out duration-300': currentRoute?.path === route.path,
						})}
					>
						<Link to={route.path}>{t(route.name)}</Link>
					</div>
				))}
			</div>
		</nav>
	);
};

export default Nav;
