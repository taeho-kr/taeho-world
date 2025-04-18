import appStore from '@/store/appStore';
import React from 'react';

interface ContentsProps {
	children: React.ReactNode;
	animate: boolean;
}

const Contents = ({ children, animate }: ContentsProps) => {
	const { navRendered } = appStore();

	if (!navRendered && animate) {
		return null;
	}

	return <main className='w-full flex-1 animate-fadeIn'>{children}</main>;
};

export default Contents;
