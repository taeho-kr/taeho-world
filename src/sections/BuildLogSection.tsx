import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';
import { CountUp } from '@/components/CountUp';

interface StatCellProps {
	label: string;
	delay?: number;
	children: ReactNode;
}

const StatCell = ({ label, delay = 0, children }: StatCellProps) => (
	<Reveal delay={delay} className="bg-[#0a0a0a]">
		<div className="p-8 h-full flex flex-col justify-center">
			<div className="text-3xl md:text-4xl font-semibold tracking-tight leading-none">{children}</div>
			<p className="text-[#525252] text-xs tracking-widest uppercase mt-3">{label}</p>
		</div>
	</Reveal>
);

const BuildLogSection = () => {
	const { t } = useTranslation();

	return (
		<section id="build-log" className="py-24 border-t border-[#1f1f1f]">
			<Reveal>
				<p className="text-xs tracking-widest uppercase text-[#525252] mb-12">{t('Build Log')}</p>
			</Reveal>

			<Reveal>
				<h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-12">
					{t('buildLog.headline')}
				</h2>
			</Reveal>

			<Reveal>
				<p className="text-[#525252] text-xs tracking-widest uppercase mb-4">
					{t('buildLog.recentLabel')}
				</p>
			</Reveal>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1f1f1f]">
				<StatCell label={t('buildLog.stats.events')}>
					<CountUp end={91488} />
				</StatCell>
				<StatCell delay={80} label={t('buildLog.stats.tools')}>
					<CountUp end={25762} />
				</StatCell>
				<StatCell delay={160} label={t('buildLog.stats.subagents')}>
					<CountUp end={1252} />
				</StatCell>
				<StatCell delay={240} label={t('buildLog.stats.workflows')}>
					<CountUp end={51} />
				</StatCell>
			</div>

			<Reveal>
				<p className="text-[#525252] text-xs tracking-widest uppercase mt-10 mb-4">
					{t('buildLog.shippedLabel')}
				</p>
			</Reveal>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#1f1f1f]">
				<StatCell label={t('buildLog.stats.commits')}>
					<CountUp end={361} />
				</StatCell>
				<StatCell delay={80} label={t('buildLog.stats.lines')}>
					+<CountUp end={321} suffix="K" /> / −<CountUp end={145} suffix="K" />
				</StatCell>
				<StatCell delay={160} label={t('buildLog.stats.activedays')}>
					<CountUp end={43} />
				</StatCell>
			</div>

			<Reveal>
				<p className="text-[#525252] text-xs tracking-widest uppercase mt-10 mb-4">
					{t('buildLog.outputLabel')}
				</p>
			</Reveal>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1f1f1f]">
				<StatCell label={t('buildLog.stats.loc')}>
					<CountUp end={124763} />
				</StatCell>
				<StatCell delay={80} label={t('buildLog.stats.components')}>
					<CountUp end={204} />
				</StatCell>
				<StatCell delay={160} label={t('buildLog.stats.tests')}>
					<CountUp end={2100} suffix="+" />
				</StatCell>
				<StatCell delay={240} label={t('buildLog.stats.coverage')}>
					<CountUp end={94} suffix="%" />
				</StatCell>
			</div>

			<Reveal>
				<p className="text-[#525252] text-xs mt-8">{t('buildLog.caption')}</p>
			</Reveal>
		</section>
	);
};

export default BuildLogSection;
