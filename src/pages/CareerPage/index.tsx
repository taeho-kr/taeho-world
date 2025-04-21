import { useState } from 'react';
import { projects } from './data';
import ProjectItem from './components/ProjectItem';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ProjectPreview from './components/ProjectPreview';
import { Project } from '@/types';

const CareerPage = () => {
	const [hoveredItemIndex, setHoveredItemIndex] = useState<number | undefined>(undefined);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	return (
		<>
			<div className='w-full h-full flex flex-col gap-4 items-end pr-2 lg:pr-4 pt-4'>
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
				<div className='min-h-[12%] w-full' />
			</div>
			<Dialog
				open={!!selectedProject}
				onOpenChange={(open: boolean) => {
					!open && setSelectedProject(null);
				}}
			>
				<DialogContent className='max-md:!w-[95vw] h-[95vh] max-h-[95vh] overflow-auto w-fit md:!h-fit md:!max-h-[80vh] max-w-[1000px]'>
					{selectedProject && <ProjectPreview project={selectedProject} />}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CareerPage;
