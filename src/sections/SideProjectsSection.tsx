import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

interface SideProject {
  id: string;
  url: string;
  techStack: string[];
}

const sideProjects: SideProject[] = [
  {
    id: 'nambti',
    url: 'https://nambti.site',
    techStack: ['Next.js', 'Tailwind CSS'],
  },
  {
    id: 'randomKorea',
    url: 'https://random-korea.taeho.world',
    techStack: ['JavaScript', 'CSS'],
  },
  {
    id: 'randomJapan',
    url: 'https://random-japan.taeho.world',
    techStack: ['JavaScript', 'CSS'],
  },
];

const SideProjectsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="side-projects" className="py-24 border-t border-[#1f1f1f]">
      <Reveal>
        <p className="text-xs tracking-widest uppercase text-[#525252] mb-12">
          {t('Side Projects')}
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sideProjects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 3) * 80} className="h-full">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-full bg-[#111111] border border-[#1f1f1f] rounded-sm p-6 hover:border-[#333333] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold">
                  {t(`sideProjects.${project.id}.name`)}
                </h3>
                <ExternalLink size={14} className="text-[#525252] group-hover:text-[#fafafa] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-[#525252] text-sm mb-4 flex-1">
                {t(`sideProjects.${project.id}.description`)}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 border border-[#2a2a2a] rounded-sm text-[#525252]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default SideProjectsSection;
