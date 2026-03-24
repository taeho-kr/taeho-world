import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

interface SideProject {
  id: string;
  url: string;
  techStack: string[];
}

const sideProjects: SideProject[] = [
  {
    id: 'realestate',
    url: 'https://realestate.taeho.world',
    techStack: ['React', 'Tailwind CSS', 'Claude'],
  },
  {
    id: 'tools',
    url: 'https://tools.taeho.world',
    techStack: ['React', 'Tailwind CSS', 'Claude'],
  },
  {
    id: 'nambti',
    url: 'https://nambti.site',
    techStack: ['Next.js', 'Tailwind CSS'],
  },
];

const SideProjectsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="side-projects" className="py-24 border-t border-[#1f1f1f]">
      <p className="text-xs tracking-widest uppercase text-[#525252] mb-12">
        {t('Side Projects')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sideProjects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#111111] border border-[#1f1f1f] rounded-sm p-6 hover:border-[#333333] transition-colors flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold">
                {t(`sideProjects.${project.id}.name`)}
              </h3>
              <ExternalLink size={14} className="text-[#525252] group-hover:text-[#fafafa] transition-colors" />
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
        ))}
      </div>
    </section>
  );
};

export default SideProjectsSection;
