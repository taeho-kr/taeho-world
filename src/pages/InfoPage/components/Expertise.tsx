import Spacing from '@/components/myUI/spaing';
import Text from '@/components/myUI/text';
import ReactIcon from '@/assets/react.svg';
import { CircuitBoard, CodeXml, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Expertise {
	area: number;
	icon: string | React.ReactNode;
	translationKey: string;
}

const expertises: Expertise[] = [
	{
		area: 1,
		icon: ReactIcon,
		translationKey: 'frontend',
	},
	{
		area: 2,
		icon: <CodeXml />,
		translationKey: 'software',
	},
	{
		area: 3,
		icon: <Sparkles />,
		translationKey: 'business',
	},
	{
		area: 4,
		icon: <CircuitBoard />,
		translationKey: 'ux',
	},
];

const Expertise = () => {
	const { t } = useTranslation();

	return (
		<div className='w-full flex flex-col items-center justify-center'>
			<Text
				size='display'
				weight='bold'
			>
				{t('Expertise')}
			</Text>
			<Spacing size={16} />
			<div
				className='w-full lg:grid lg:flex lg:flex-col lg:px-5 [&>:first-child]:border-t'
				style={{
					gridTemplateAreas: `
            "card1 card1 card1"
            "card2 card3 card4"
        `,
				}}
			>
				{expertises.map((expertise) => (
					<div
						key={expertise.translationKey}
						className='flex flex-col items-center gap-2 p-4 border-b lg:border'
						style={{
							gridArea: 'card' + expertise.area,
						}}
					>
						<div className='flex flex-row gap-4 items-center '>
							{typeof expertise.icon === 'string' ? (
								<img
									className='w-10 h-10'
									src={expertise.icon}
								/>
							) : (
								<p className='[&_svg]:w-10 [&_svg]:h-10 flex items-center justify-center'>
									{expertise.icon}
								</p>
							)}
							<div className='flex flex-col'>
								<Text size='subtitle'>{t(`expertise.${expertise.translationKey}.title`)}</Text>
								<Text
									size='label'
									className='bg-[var(--foreground)] text-[var(--background)] w-fit'
								>
									{t(`expertise.${expertise.translationKey}.subtitle`)}
								</Text>
							</div>
						</div>
						<Spacing size={8} />
						<Text
							size='caption'
							weight='regular'
							className='break-word max-w-[270px] pl-4'
						>
							{t(`expertise.${expertise.translationKey}.description`)}
						</Text>
					</div>
				))}
			</div>
		</div>
	);
};

export default Expertise;
