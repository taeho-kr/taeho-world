import { useCallback, useState } from 'react';
import { projects } from './data';
import ProjectItem from './components/ProjectItem';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import ProjectPreview from './components/ProjectPreview';
import { Project } from '@/types';

const CareerPage = () => {
	const [hoveredItemIndex, setHoveredItemIndex] = useState<number | undefined>(undefined);
	const [maxHeight, setMaxHeight] = useState<number>(0);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const ref = useCallback((node: HTMLDivElement | null) => {
		if (node) {
			const parentHeight = node.parentElement!.clientHeight;
			setMaxHeight(parentHeight);
		}
	}, []);

	return (
		<div
			ref={ref}
			className='w-full h-full flex flex-col relative gap-4 items-end overflow-auto pr-2'
			style={{ maxHeight: maxHeight + 'px' }}
		>
			<div className='sticky w-full min-h-4 bottom-0 left-0 bg-gradient-to-t from-[transparent] to-[var(--background)]' />
			{[...projects].reverse().map((project, index) => (
				<ProjectItem
					key={project.id}
					project={project}
					hovered={hoveredItemIndex === index}
					onMouseEnter={() => setHoveredItemIndex(index)}
					onMouseLeave={() => setHoveredItemIndex(undefined)}
					setSelectedProject={setSelectedProject}
				/>
			))}
			<div className='sticky w-full min-h-4 bottom-0 left-0 bg-gradient-to-t from-[var(--background)] to-[transparent]' />
			<Dialog
				open={!!selectedProject}
				onOpenChange={(open: boolean) => {
					!open && setSelectedProject(null);
				}}
			>
				<DialogContent className='w-fit max-w-[1200px]'>
					<DialogTitle />
					{selectedProject && <ProjectPreview project={selectedProject} />}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CareerPage;
