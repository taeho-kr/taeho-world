import Text from '@/components/myUI/text';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import appStore from '@/store/appStore';
import i18next from 'i18next';
import { Copyright, Globe, MoonStar, Sun } from 'lucide-react';
import { useEffect } from 'react';

const Footer = () => {
	const { setFooterRendered } = appStore();
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setFooterRendered(true);
	}, []);

	const changeLanguage = () => {
		i18next.changeLanguage(i18next.language === 'en' ? 'kr' : 'en');
	};

	return (
		<footer className='py-2 pl-2 flex flex-row justify-between items-center'>
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
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant='ghost'
							onClick={changeLanguage}
							disabled
						>
							<Globe />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<Text size='small'>Will updated</Text>
					</TooltipContent>
				</Tooltip>
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
