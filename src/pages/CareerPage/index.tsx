import { useCallback, useState } from 'react';
import { projects } from './data';
import ProjectItem from './components/ProjectItem';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ProjectPreview from './components/ProjectPreview';
import { Project } from '@/types';

const CareerPage = () => {
	const [hoveredItemIndex, setHoveredItemIndex] = useState<number | undefined>(undefined);
	const [maxHeight, setMaxHeight] = useState<number>(0);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const ref = useCallback((node: HTMLDivElement | null) => {
		if (node) {
			const parentOffsetTop = node.offsetTop;
			const viewportHeight = window.innerHeight;

			const newMaxHeight = viewportHeight - parentOffsetTop - 117;
			setMaxHeight(newMaxHeight);
		}
	}, []);

	return (
		<div
			ref={ref}
			className='w-full h-full flex flex-col relative gap-12 items-end overflow-auto pr-2'
			style={{ maxHeight: maxHeight + 'px' }}
		>
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
			<div className='sticky w-full min-h-20 bottom-0 left-0 bg-gradient-to-t from-[var(--background)] to-[transparent]' />
			<Dialog
				open={!!selectedProject}
				onOpenChange={(open: boolean) => {
					!open && setSelectedProject(null);
				}}
			>
				<DialogContent className='w-fit max-w-[1200px]'>
					{selectedProject && <ProjectPreview project={selectedProject} />}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CareerPage;
