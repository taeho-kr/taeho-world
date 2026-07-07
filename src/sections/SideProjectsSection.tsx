import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';

interface SideProject {
  id: string;
  url: string;
}

const sideProjects: SideProject[] = [
  { id: 'mpti', url: 'https://mypoliticaltypeindicator.com' },
  { id: 'nambti', url: 'https://nambti.site' },
  { id: 'randomKorea', url: 'https://random-korea.taeho.world' },
  { id: 'randomJapan', url: 'https://random-japan.taeho.world' },
];

const displayUrl = (url: string) => url.replace(/^https?:\/\//, '');

const SideProjectsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="side-projects" aria-labelledby="side-projects-t">
      <div className="sec-head">
        <h2 className="sec-title" id="side-projects-t">
          <span className="ord">05</span> {t('Side Projects')}
        </h2>
        <div className="sec-meta tnum">
          {t('ui.sideMeta', { n: String(sideProjects.length).padStart(2, '0') })}
        </div>
      </div>
      <Reveal variant="up">
        <div className="side-list">
          {sideProjects.map((project, i) => (
            <a
              key={project.id}
              className="side-row"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="side-idx tnum">{String(i + 1).padStart(2, '0')}</div>
              <div className="side-name">{t(`sideProjects.${project.id}.name`)}</div>
              <div className="side-desc">{t(`sideProjects.${project.id}.description`)}</div>
              <div className="side-url">
                {displayUrl(project.url)} <span aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default SideProjectsSection;
