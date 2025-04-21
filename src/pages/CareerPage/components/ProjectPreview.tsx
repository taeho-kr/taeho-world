import Chip from '@/components/myUI/chip';
import Spacing from '@/components/myUI/spaing';
import Text from '@/components/myUI/text';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Project } from '@/types';
import { useEffect, useState } from 'react';

interface ProjectPreviewProps {
	project: Project;
}

const ProjectPreview = ({ project }: ProjectPreviewProps) => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
		const imgElement = event.currentTarget;
		if (imgElement.requestFullscreen) {
			imgElement.requestFullscreen().catch((err) => {
				console.error('Error entering fullscreen:', err);
			});
		}
	};

	return (
		<div className='flex flex-col gap-2 relative'>
			<Tooltip>
				<TooltipTrigger asChild>
					{project.images.length > 1 ? (
						<div className='flex flex-col items-center'>
							<Carousel setApi={setApi}>
								<CarouselContent>
									{project.images.map((image, index) => (
										<CarouselItem
											className='flex justify-center'
											key={index}
										>
											<img
												src={image}
												className='w-fit h-auto max-h-[240px] max-w-[80%] object-contain cursor-pointer hover:scale-105 transition-transform duration-300'
												onClick={handleImageClick}
												alt={`${project.name} ${index + 1}`}
											/>
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>
							<Spacing size={16} />
							<div className='flex flex-row gap-2'>
								{new Array(count).fill(0).map((_, index) => (
									<div
										key={index}
										className={`w-6 h-2 rounded-full bg-[var(--foreground)] cursor-pointer hover:scale-120 ${
											current === index + 1 ? 'opacity-100' : 'opacity-40'
										}`}
										onClick={() => {
											api?.scrollTo(index);
										}}
									/>
								))}
							</div>
						</div>
					) : (
						<img
							src={project.images[0]}
							className='w-auto h-auto max-h-[240px] max-w-[80%] object-contain m-auto cursor-pointer hover:scale-105 transition-transform duration-300'
							onClick={handleImageClick}
						/>
					)}
				</TooltipTrigger>
				<TooltipContent>
					<Text size='body'>Click to view in fullscreen</Text>
				</TooltipContent>
			</Tooltip>
			<Spacing size={16} />
			<DialogTitle>
				<Text size='title'>{project.name}</Text>
			</DialogTitle>
			<DialogDescription>
				<Text
					size='body'
					color='var(--label-fade)'
				>
					{project.singleSentence}
				</Text>
			</DialogDescription>
			<Spacing size={16} />
			<div className='lg:max-w-[70%]'>{project.description}</div>
			<Spacing size={24} />
			<Text size='body'>Tech Stack</Text>
			<div className='max-lg:flex max-lg:flex-col'>
				{project.techStack.map((tech) => (
					<Chip
						key={tech}
						className='mr-2 mb-2 w-fit'
					>
						{tech}
					</Chip>
				))}
			</div>
		</div>
	);
};

export default ProjectPreview;
