import { useState } from "react";
import { projects } from "./data";
import ProjectItem from "./components/ProjectItem";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ProjectPreview from "./components/ProjectPreview";
import { Project } from "@/types";

const CareerPage = () => {
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | undefined>(
    undefined
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="w-full h-full flex flex-col relative gap-4 items-end pr-4 py-5">
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
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open: boolean) => {
          !open && setSelectedProject(null);
        }}
      >
        <DialogContent className="w-fit max-w-[1200px]">
          <DialogTitle />
          {selectedProject && <ProjectPreview project={selectedProject} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CareerPage;
