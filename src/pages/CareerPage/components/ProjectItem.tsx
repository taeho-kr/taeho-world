import Text from '@/components/myUI/text';
import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { openPage } from '@/utils/common';
import { company } from '../data';
import Chip from '@/components/myUI/chip';
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
			className={cn(`flex flex-col gap-0.25 items-baseline transition-transform duration-300 items-end`, {
				'bg-[var(--foreground)] text-[var(--muted-foreground)]': hovered,
			})}
		>
			<div className='flex flex-col lg:!flex-row items-end lg:!items-baseline'>
				<Text
					size='title'
					className={cn('text-right', {
						'hover:text-[var(--background)] cursor-pointer': project.url !== undefined,
						'cursor-default': project.url === undefined,
					})}
					onClick={() => project.url && openPage(project.url)}
				>
					{project.url ? (
						<>{project.name}&nbsp;</>
					) : (
						<Tooltip>
							<TooltipTrigger className='text-right'>{project.name}&nbsp;</TooltipTrigger>
							<TooltipContent side='bottom'>
								<Text size='body'>On-Premise service</Text>
							</TooltipContent>
						</Tooltip>
					)}
				</Text>
				<div>
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
			</div>
			<div className='[&>div]:ml-2 [&>div]:first:ml-0 w-fit text-right'>
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
