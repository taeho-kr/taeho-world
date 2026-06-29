import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';
import { CountUp } from '@/components/CountUp';

const BuildLogSection = () => {
	const { t } = useTranslation();

	return (
		<section id="build-log" aria-labelledby="build-log-t">
			<div className="sec-head">
				<h2 className="sec-title" id="build-log-t">
					<span className="ord">02</span> {t('Build Log')}
				</h2>
				<div className="sec-meta">{t('ui.metricsMeta')}</div>
			</div>

			<Reveal>
				<p className="bl-headline">{t('buildLog.headline')}</p>
			</Reveal>
			<p className="buildlog-cap">{t('buildLog.caption')}</p>

			{/* Honest meters — authorship split, diverging lines, coverage */}
			<Reveal variant="up">
				<div className="bl-meters">
					<div className="meter">
						<div className="m-cap">{t('ui.meters.commits')}</div>
						<div className="m-big tnum">
							<CountUp end={361} /> <small>{t('ui.meters.commitsUnit')}</small>
						</div>
						<div
							className="meter-bar"
							role="img"
							aria-label="361 commits: 87.8 percent AI-authored, 12.2 percent human."
						>
							<span className="seg-fill" style={{ width: '87.8%' }} />
							<span className="seg-rest" />
						</div>
						<div className="m-legend">
							<span className="lg">
								<span className="sw fill" aria-hidden="true" />
								{t('ui.legend.ai')} <b>87.8%</b>
							</span>
							<span className="lg">
								{t('ui.legend.human')} <b>12.2%</b>
							</span>
						</div>
					</div>

					<div className="meter">
						<div className="m-cap">{t('ui.meters.lines')}</div>
						<div className="m-big tnum">
							<CountUp end={321} prefix="+" suffix="K" />{' '}
							<small>
								/ <CountUp end={145} prefix="−" suffix="K" />
							</small>
						</div>
						<div
							className="meter-bar"
							role="img"
							aria-label="Lines changed: 321 thousand added (68.9 percent), 145 thousand deleted (31.1 percent)."
						>
							<span className="seg-add" style={{ width: '68.9%' }} />
							<span className="seg-del" style={{ width: '31.1%' }} />
						</div>
						<div className="m-legend">
							<span className="lg">
								<span className="sw fill" aria-hidden="true" />
								{t('ui.legend.added')} <b>68.9%</b>
							</span>
							<span className="lg">
								<span className="sw del" aria-hidden="true" />
								{t('ui.legend.deleted')} <b>31.1%</b>
							</span>
						</div>
					</div>

					<div className="meter">
						<div className="m-cap">{t('ui.meters.coverage')}</div>
						<div className="m-big tnum">
							<CountUp end={94} />
							<small>%</small>
						</div>
						<div className="meter-bar" role="img" aria-label="Test coverage 94 percent.">
							<span className="seg-fill" style={{ width: '94%' }} />
							<span className="seg-rest" />
						</div>
						<div className="m-legend">
							<span className="lg">
								<span className="sw fill" aria-hidden="true" />
								{t('ui.legend.covered')} <b>94%</b>
							</span>
							<span className="lg">
								{t('ui.legend.uncovered')} <b>6%</b>
							</span>
						</div>
					</div>
				</div>
			</Reveal>

			{/* Tabular build log — three captioned groups */}
			<table className="bl">
				<caption>{t('buildLog.recentLabel')}</caption>
				<tbody>
					<tr>
						<td>{t('buildLog.stats.events')}</td>
						<td className="tnum">
							<CountUp end={91488} />
						</td>
						<td>{t('ui.units.events')}</td>
					</tr>
					<tr>
						<td>{t('buildLog.stats.tools')}</td>
						<td className="tnum">
							<CountUp end={25762} />
						</td>
						<td>{t('ui.units.calls')}</td>
					</tr>
					<tr>
						<td>{t('buildLog.stats.subagents')}</td>
						<td className="tnum">
							<CountUp end={1252} />
						</td>
						<td>{t('ui.units.spawned')}</td>
					</tr>
					<tr>
						<td>{t('buildLog.stats.workflows')}</td>
						<td className="tnum">
							<CountUp end={51} />
						</td>
						<td>{t('ui.units.runs')}</td>
					</tr>
				</tbody>

				<caption>{t('buildLog.shippedLabel')}</caption>
				<tbody>
					<tr>
						<td>{t('buildLog.stats.commits')}</td>
						<td className="tnum">
							<CountUp end={361} />
						</td>
						<td>{t('ui.units.commitsAi')}</td>
					</tr>
					<tr>
						<td>{t('buildLog.stats.lines')}</td>
						<td className="tnum">
							<CountUp end={321} prefix="+" suffix="K" /> /{' '}
							<CountUp end={145} prefix="−" suffix="K" />
						</td>
						<td>{t('ui.units.lines')}</td>
					</tr>
					<tr>
						<td>{t('buildLog.stats.activedays')}</td>
						<td className="tnum">
							<CountUp end={43} />
						</td>
						<td>{t('ui.units.days')}</td>
					</tr>
				</tbody>

				<caption>{t('buildLog.outputLabel')}</caption>
				<tbody>
					<tr>
						<td>{t('buildLog.stats.loc')}</td>
						<td className="tnum">
							<CountUp end={124763} />
						</td>
						<td>{t('ui.units.loc')}</td>
					</tr>
					<tr>
						<td>{t('buildLog.stats.components')}</td>
						<td className="tnum">
							<CountUp end={204} />
						</td>
						<td>{t('ui.units.modules')}</td>
					</tr>
					<tr>
						<td>{t('buildLog.stats.tests')}</td>
						<td className="tnum">
							<CountUp end={2100} suffix="+" />
						</td>
						<td>{t('ui.units.cases')}</td>
					</tr>
					<tr>
						<td>{t('buildLog.stats.coverage')}</td>
						<td className="tnum">
							<CountUp end={94} suffix="%" />
						</td>
						<td>{t('ui.units.covered')}</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};

export default BuildLogSection;
