import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';
import { projects } from '@/pages/CareerPage/data';

const BAR_LIMIT = 7;

interface FreqEntry {
  name: string;
  count: number;
}

/**
 * Tech-stack usage frequency, COMPUTED at runtime from the career data's
 * `techStack` arrays. Counts occurrences across every project, sorts
 * descending, renders the top entries as scaled bars and the rest as a
 * compact "also (×1)" line. Nothing is hardcoded — the numbers track the
 * data array, so editing a project's stack updates this section.
 */
const StackSection = () => {
  const { t } = useTranslation();

  const { bars, also, max, total } = useMemo(() => {
    const tally = new Map<string, number>();
    for (const project of projects) {
      for (const tech of project.techStack) {
        tally.set(tech, (tally.get(tech) ?? 0) + 1);
      }
    }

    const ranked: FreqEntry[] = [...tally.entries()]
      .map(([name, count]) => ({ name, count }))
      // Stable, deterministic order: count desc, then name asc.
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

    const maxCount = ranked.length ? ranked[0].count : 1;
    const barEntries = ranked.filter((e) => e.count > 1).slice(0, BAR_LIMIT);
    const restEntries = ranked.filter((e) => !barEntries.includes(e));

    return {
      bars: barEntries,
      also: restEntries,
      max: maxCount,
      total: projects.length,
    };
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const vizAria = [
    `Tech-stack usage frequency across ${total} projects, scaled to maximum of ${max}.`,
    ...bars.map((b) => `${b.name} ${b.count}.`),
    also.length ? `Also one each: ${also.map((a) => a.name).join(', ')}.` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id="stack" aria-labelledby="stack-t">
      <div className="sec-head">
        <h2 className="sec-title" id="stack-t">
          <span className="ord">04</span> {t('projectPreview.techStack')}
        </h2>
        <div className="sec-meta tnum">{t('ui.stack.meta', { n: pad(total) })}</div>
      </div>

      <Reveal variant="up">
        <div className="viz-panel">
          <div className="viz-phead">
            <span className="vp-title">{t('ui.stack.title')}</span>
            <span className="vp-meta">{t('ui.stack.scale', { total, max })}</span>
          </div>

          <div className="freq" role="img" aria-label={vizAria}>
            {bars.map((b) => (
              <div className="freq-row" key={b.name}>
                <span className="freq-name">{b.name}</span>
                <span className="freq-bar">
                  <i style={{ width: `${(b.count / max) * 100}%` }} />
                </span>
                <span className="freq-count">{b.count}</span>
              </div>
            ))}
          </div>

          {also.length > 0 && (
            <p className="freq-also">
              <b>{t('ui.stack.also')}</b> {also.map((a) => a.name).join(', ')}
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
};

export default StackSection;
