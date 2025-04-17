import Text from "@/components/myUI/text";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { openPage } from "@/utils/common";
import { company } from "../data";

interface ProjectItemProps {
  project: Project;
  hovered: boolean;
}

const ProjectItem = ({
  project,
  hovered,
  ...props
}: ProjectItemProps & React.ComponentProps<"div">) => {
  return (
    <div
      key={project.id}
      {...props}
      className={cn(
        `flex flex-col items-baseline transition-transform duration-300 items-end`,
        {
          "bg-[var(--foreground)] text-[var(--muted-foreground)]": hovered,
        }
      )}
    >
      <div className="flex flex-row items-baseline">
        <Text
          size="title"
          className={cn("", {
            "hover:text-[var(--background)] cursor-pointer":
              project.url !== undefined,
            "cursor-default": project.url === undefined,
          })}
          onClick={() => project.url && openPage(project.url)}
        >
          {project.product}&nbsp;
        </Text>
        <Text size="caption">with&nbsp;</Text>
        <Text
          size="label"
          className="hover:text-[var(--background)] cursor-pointer"
          onClick={() =>
            openPage(company.find((c) => c.id === project.company)!.url)
          }
        >
          {company.find((c) => c.id === project.company)?.name}
        </Text>
      </div>
      <Text size="small" className="opacity-70">
        {project.start} ~ {project.end || "in progress"}
      </Text>
      <Text size="small">Service Preview</Text>
    </div>
  );
};

export default ProjectItem;
