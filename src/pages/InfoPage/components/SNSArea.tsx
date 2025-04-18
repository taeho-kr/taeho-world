import Spacing from '@/components/myUI/spaing';
import Text from '@/components/myUI/text';
import { Instagram, Linkedin, Send } from 'lucide-react';

const sns_s = [
	{
		name: 'Instagram',
		link: 'https://www.instagram.com/taeho._.world/',
		icon: <Instagram />,
	},
	{
		name: 'Email',
		link: 'mailto:domybestatleastonceaweek@gmail.com',
		icon: <Send />,
	},
	{
		name: 'LinkedIn',
		link: 'https://www.linkedin.com/in/taeho-kim-0a504a335/',
		icon: <Linkedin />,
	},
];

const SNSArea = () => {
	return (
		<div className='flex flex-col items-center'>
			<Text
				size='display'
				weight='bold'
			>
				Contact
			</Text>
			<Spacing size={16} />
			<div className='flex flex-row gap-10'>
				{sns_s.map((sns) => {
					return (
						<div
							key={sns.name}
							className='cursor-pointer hover:text-[var(--muted)]'
						>
							<a
								title={sns.name}
								href={sns.link}
								target='_blank'
								rel='noopener noreferrer'
								className='[&_svg]:w-12 [&_svg]:h-12'
							>
								{sns.icon}
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SNSArea;
