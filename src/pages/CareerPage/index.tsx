import { useState } from "react";
import { projects } from "./data";
import ProjectItem from "./components/ProjectItem";

const CareerPage = () => {
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | undefined>(
    undefined
  );

  return (
    <div className="w-full h-full flex flex-col gap-5 items-end">
      {projects.reverse().map((project, index) => (
        <ProjectItem
          key={project.id}
          project={project}
          hovered={hoveredItemIndex === index}
          onMouseEnter={() => setHoveredItemIndex(index)}
          onMouseLeave={() => setHoveredItemIndex(undefined)}
        />
      ))}
    </div>
  );
};

export default CareerPage;
