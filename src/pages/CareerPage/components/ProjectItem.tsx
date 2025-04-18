import Text from '@/components/myUI/text';
import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { openPage } from '@/utils/common';
import { company } from '../data';
import Chip from '@/components/myUI/chip';
import Spacing from '@/components/myUI/spaing';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ProjectItemProps {
	project: Project;
	hovered: boolean;
	setSelectedProject: (project: Project | null) => void;
}

const ProjectItem = ({
	project,
	hovered,
	setSelectedProject,
	...props
}: ProjectItemProps & React.ComponentProps<'div'>) => {
	return (
		<div
			key={project.id}
			{...props}
			className={cn(`flex flex-col gap-0.5 items-baseline transition-transform duration-300 items-end`, {
				'bg-[var(--foreground)] text-[var(--muted-foreground)]': hovered,
			})}
		>
			<div className='flex flex-row items-baseline'>
				<Text
					size='title'
					className={cn('', {
						'hover:text-[var(--background)] cursor-pointer': project.url !== undefined,
						'cursor-default': project.url === undefined,
					})}
					onClick={() => project.url && openPage(project.url)}
				>
					{project.url ? (
						<>{project.name}&nbsp;</>
					) : (
						<Tooltip>
							<TooltipTrigger>{project.name}&nbsp;</TooltipTrigger>
							<TooltipContent side='bottom'>
								<Text size='body'>On-Premise service</Text>
							</TooltipContent>
						</Tooltip>
					)}
				</Text>
				<Text
					size='caption'
					color='var(--muted-foreground)'
				>
					with&nbsp;
				</Text>
				<Text
					size='label'
					className='hover:text-[var(--background)] cursor-pointer'
					onClick={() => openPage(company.find((c) => c.id === project.company)!.url)}
				>
					{company.find((c) => c.id === project.company)?.name}
				</Text>
			</div>
			<div className='flex flex-row gap-2'>
				{project.domains.map((domain, i) => (
					<Chip
						size='sm'
						key={i}
					>
						{domain}
					</Chip>
				))}
			</div>
			<Text
				size='small'
				color='var(--muted-foreground)'
			>
				{project.start} ~ {project.end || 'in progress'}
			</Text>
			<Spacing size={4} />
			<Button
				size='sm'
				variant='text'
				onClickCapture={() => setSelectedProject(project)}
			>
				Service Preview
			</Button>
		</div>
	);
};

export default ProjectItem;
