import Text from '@/components/myUI/text';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import appStore from '@/store/appStore';
import { Copyright, MoonStar, Sun } from 'lucide-react';
import { useEffect } from 'react';

const Footer = () => {
	const { setFooterRendered } = appStore();
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setFooterRendered(true);
	}, []);

	return (
		<footer className='pt-2 pl-2 flex flex-row justify-between items-center'>
			<div className='flex flex-row gap-1 items-center text-muted'>
				<Copyright className='w-5 h-5' />
				<Text
					size='body'
					weight='light'
				>
					Everyone
				</Text>
			</div>
			<div>
				<Button
					variant='ghost'
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				>
					{theme === 'dark' ? <MoonStar color='#7474dc' /> : <Sun color='#bf8622' />}
				</Button>
			</div>
		</footer>
	);
};

export default Footer;
