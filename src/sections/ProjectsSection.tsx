import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ExternalLink } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { projects, company } from '@/pages/CareerPage/data';
import { Reveal } from '@/components/Reveal';
import { Chip } from '@/components/Chip';
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

const formatPeriod = (start: string, end: string | undefined, present: string) => {
  const fmt = (s: string) => {
    const [y, m] = s.split('-');
    return `${y}.${m}`;
  };
  return end ? `${fmt(start)} — ${fmt(end)}` : `${fmt(start)} — ${present}`;
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
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onKeyDown={handleKeyDown}
          className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl max-h-[90vh] overflow-y-auto [background:var(--card-face)] border border-[var(--border-lit)] rounded-[var(--radius-card)] shadow-[var(--shadow-modal)] p-8 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        >
          {/* Close button */}
          <DialogPrimitive.Close
            className="absolute top-4 right-4 text-[var(--fg-muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label={t('ui.close')}
          >
            <X size={18} />
          </DialogPrimitive.Close>

          {/* Header */}
          <p className="text-folio uppercase tracking-[0.18em] nums-tabular text-[var(--fg-muted)]">
            {companyData?.name} &bull; {formatPeriod(project.start, project.end, t('ui.present'))}
          </p>
          <DialogPrimitive.Title className="text-h2 opsz-head leading-[1.05] mt-2">
            {t(`projects.${project.translationKey}.name`)}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="text-caption text-[var(--fg-muted)] mt-3">
            {t(`projects.${project.translationKey}.singleSentence`)}
          </DialogPrimitive.Description>

          {/* Carousel */}
          {project.images.length > 0 && (
            <>
              <div className="hairline my-6" />
              <div className="px-10 relative">
                <Carousel setApi={setApi}>
                  <CarouselContent>
                    {project.images.map((img, i) => (
                      <CarouselItem key={i}>
                        <img
                          src={img}
                          alt={`${t(`projects.${project.translationKey}.name`)} — screenshot ${i + 1}`}
                          className="w-full aspect-video object-cover rounded-sm"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {count > 1 && (
                    <>
                      <CarouselPrevious className="bg-[var(--surface-4)] border-[var(--border-hover)] text-[var(--fg-body)] hover:bg-[#222] hover:text-white -left-8" />
                      <CarouselNext className="bg-[var(--surface-4)] border-[var(--border-hover)] text-[var(--fg-body)] hover:bg-[#222] hover:text-white -right-8" />
                    </>
                  )}
                </Carousel>
                {count > 1 && (
                  <p className="text-center text-folio nums-tabular text-[var(--fg-muted)] mt-3">
                    {current} / {count}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Summary */}
          <div className="hairline my-6" />
          <p className="text-caption text-[var(--fg-body)] leading-[1.6] measure">
            {t(`projects.${project.translationKey}.summary`)}
          </p>

          {/* Detail */}
          <p className="text-caption text-[var(--fg-body)] leading-[1.6] measure mt-4">
            {t(`projects.${project.translationKey}.detail`)}
          </p>

          {/* Tech Stack */}
          <div className="hairline my-6" />
          <p className="text-folio uppercase tracking-[0.18em] text-[var(--fg-muted)] mb-3">{t('projectPreview.techStack')}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>

          {/* Links */}
          {(project.url || project.videoUrl) && (
            <>
              <div className="hairline my-6" />
              <div className="flex flex-wrap gap-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-caption text-[var(--foreground)] border border-[var(--border-hover)] px-4 py-2 hover:bg-[var(--surface-4)] transition-colors rounded-sm"
                  >
                    {t('ui.visitSite')} <ExternalLink size={12} />
                  </a>
                )}
                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-caption text-[var(--foreground)] border border-[var(--border-hover)] px-4 py-2 hover:bg-[var(--surface-4)] transition-colors rounded-sm"
                  >
                    {t('ui.watchVideo')} <ExternalLink size={12} />
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
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) => {
  const { t } = useTranslation();
  const companyData = company.find((c) => c.id === project.company);
  const firstImage = project.images[0];
  const name = t(`projects.${project.translationKey}.name`);
  const ord = String(index + 1).padStart(2, '0');

  return (
    <button
      type="button"
      className="proj-card"
      aria-label={name}
      onClick={onOpen}
    >
      {firstImage ? (
        <img src={firstImage} alt={`${name} screenshot`} loading="lazy" />
      ) : (
        <span className="w-full aspect-video block bg-[var(--surface-3)]" />
      )}
      <span className="pc-num">{ord}</span>
      <span className="pc-co">{companyData?.name}</span>
      <span className="pc-go">{t('ui.detail')} →</span>
      <span className="pc-cap">
        <span className="pc-name">{name}</span>
        <span className="pc-period">{formatPeriod(project.start, project.end, t('ui.present'))}</span>
      </span>
    </button>
  );
};

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" aria-labelledby="projects-t">
      <div className="sec-head">
        <h2 className="sec-title" id="projects-t">
          <span className="ord">03</span> {t('Projects')}
        </h2>
        <div className="sec-meta tnum">
          {t('ui.projectsMeta', { n: String(projects.length).padStart(2, '0') })}
        </div>
      </div>

      <Reveal variant="up">
        <div className="proj-grid">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </Reveal>

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
