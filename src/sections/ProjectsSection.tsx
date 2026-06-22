import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ExternalLink } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { projects, company } from '@/pages/CareerPage/data';
import { Reveal } from '@/components/Reveal';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useEffect, useCallback } from 'react';

type Project = typeof projects[number];

const formatPeriod = (start: string, end?: string) => {
  const fmt = (s: string) => {
    const [y, m] = s.split('-');
    return `${y}.${m}`;
  };
  return end ? `${fmt(start)} — ${fmt(end)}` : `${fmt(start)} — Present`;
};

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const companyData = company.find((c) => c.id === project.company);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  return (
    <DialogPrimitive.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onKeyDown={handleKeyDown}
          className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f0f0f] border border-[#1f1f1f] rounded-sm p-8 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        >
          {/* Close button */}
          <DialogPrimitive.Close
            className="absolute top-4 right-4 text-[#525252] hover:text-[#fafafa] transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </DialogPrimitive.Close>

          {/* Header */}
          <p className="text-xs text-[#525252] tracking-widest uppercase">
            {companyData?.name} &bull; {formatPeriod(project.start, project.end)}
          </p>
          <DialogPrimitive.Title className="text-3xl font-bold mt-1">
            {t(`projects.${project.translationKey}.name`)}
          </DialogPrimitive.Title>
          <p className="text-[#888] mt-2 text-sm">
            {t(`projects.${project.translationKey}.singleSentence`)}
          </p>

          {/* Carousel */}
          {project.images.length > 0 && (
            <>
              <div className="border-t border-[#1f1f1f] my-6" />
              <div className="px-10 relative">
                <Carousel setApi={setApi}>
                  <CarouselContent>
                    {project.images.map((img, i) => (
                      <CarouselItem key={i}>
                        <img
                          src={img}
                          alt={`${project.translationKey} screenshot ${i + 1}`}
                          className="w-full aspect-video object-cover rounded-sm"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {count > 1 && (
                    <>
                      <CarouselPrevious className="bg-[#1a1a1a] border-[#333] text-[#aaa] hover:bg-[#2a2a2a] hover:text-white -left-8" />
                      <CarouselNext className="bg-[#1a1a1a] border-[#333] text-[#aaa] hover:bg-[#2a2a2a] hover:text-white -right-8" />
                    </>
                  )}
                </Carousel>
                {count > 1 && (
                  <p className="text-center text-xs text-[#525252] mt-3">
                    {current} / {count}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Summary */}
          <div className="border-t border-[#1f1f1f] my-6" />
          <p className="text-[#aaa] leading-relaxed text-sm">
            {t(`projects.${project.translationKey}.summary`)}
          </p>

          {/* Detail */}
          <p className="text-[#aaa] leading-relaxed text-sm mt-4">
            {t(`projects.${project.translationKey}.detail`)}
          </p>

          {/* Tech Stack */}
          <div className="border-t border-[#1f1f1f] my-6" />
          <p className="text-xs text-[#525252] tracking-widest uppercase mb-3">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 border border-[#2a2a2a] rounded-sm text-[#666]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          {(project.url || project.videoUrl) && (
            <>
              <div className="border-t border-[#1f1f1f] my-6" />
              <div className="flex flex-wrap gap-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#fafafa] border border-[#333] px-4 py-2 hover:bg-[#1a1a1a] transition-colors rounded-sm"
                  >
                    Visit Site <ExternalLink size={12} />
                  </a>
                )}
                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#fafafa] border border-[#333] px-4 py-2 hover:bg-[#1a1a1a] transition-colors rounded-sm"
                  >
                    Watch Video <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

const ProjectCard = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) => {
  const { t } = useTranslation();
  const companyData = company.find((c) => c.id === project.company);
  const firstImage = project.images[0];

  const endLabel = project.end
    ? project.end.slice(0, 7).replace('-', '.')
    : t('projectItem.inProgress');
  const startLabel = project.start.slice(0, 7).replace('-', '.');

  return (
    <div
      className="group bg-[#111111] border border-[#1f1f1f] rounded-sm overflow-hidden hover:border-[#333333] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col cursor-pointer"
      onClick={onClick}
    >
      {firstImage ? (
        <div className="overflow-hidden">
          <img
            src={firstImage}
            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
            alt={project.translationKey}
          />
        </div>
      ) : (
        <div className="w-full aspect-video bg-[#1a1a1a]" />
      )}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-[#525252] text-xs tracking-widest uppercase mb-2">
          {companyData?.name} · {startLabel} ~ {endLabel}
        </p>
        <h3 className="text-base font-semibold mb-2 leading-snug">
          {t(`projects.${project.translationKey}.name`)}
        </h3>
        <p className="text-[#525252] text-sm mb-4 flex-1">
          {t(`projects.${project.translationKey}.singleSentence`)}
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
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 border-t border-[#1f1f1f]">
      <Reveal>
        <p className="text-xs tracking-widest uppercase text-[#525252] mb-12">
          {t('Projects')}
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 2) * 80} className="h-full">
            <ProjectCard
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          </Reveal>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
