import Chip from '@/components/myUI/chip';
import Spacing from '@/components/myUI/spaing';
import Text from '@/components/myUI/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Project } from '@/types';

interface ProjectPreviewProps {
	project: Project;
}

const ProjectPreview = ({ project }: ProjectPreviewProps) => {
	const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
		const imgElement = event.currentTarget;
		if (imgElement.requestFullscreen) {
			imgElement.requestFullscreen().catch((err) => {
				console.error('Error entering fullscreen:', err);
			});
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			<Tooltip>
				<TooltipTrigger>
					<img
						src={project.image}
						className='w-auto h-auto max-h-[240px] m-auto cursor-pointer hover:scale-105 transition-transform duration-300'
						onClick={handleImageClick}
						alt={project.name}
					/>
				</TooltipTrigger>
				<TooltipContent>
					<Text size='body'>Click to view in fullscreen</Text>
				</TooltipContent>
			</Tooltip>
			<Spacing size={16} />
			<Text size='title'>{project.name}</Text>
			<Text
				size='body'
				color='var(--label-fade)'
			>
				{project.singleSentence}
			</Text>
			<Spacing size={16} />
			{project.description}
			<Spacing size={24} />
			<Text size='body'>Tech Stack</Text>
			<div className='flex flex-row gap-2'>
				{project.techStack.map((tech) => (
					<Chip key={tech}>{tech}</Chip>
				))}
			</div>
		</div>
	);
};

export default ProjectPreview;
