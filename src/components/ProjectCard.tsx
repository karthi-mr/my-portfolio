import type { ReactElement } from "react";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import type { ProjectDataInput } from "../data/ProjectsData.ts";

type ProjectCardProps = {
  projectData: ProjectDataInput;
  onView: (projectData: ProjectDataInput) => void;
}

function ProjectCard(
  {
    projectData,
    onView
  }: ProjectCardProps
): ReactElement {
  const imageClass = "w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105";

  return (
    <article className="group relative h-full flex flex-col overflow-hidden glass card-hover">
      {/* image */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-fg/5">
        {projectData.projectImageLinks.length > 0 ? (
          <img
            src={`${projectData.projectImageLinks[0].projectImageLink}?raw=true`}
            alt={projectData.projectImageLinks[0].imageTitle}
            className={imageClass}
          />
        ) : (
          <img
            src="https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"
            alt="No Image available"
            className={imageClass}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="flex grow flex-col p-5 md:p-6">
        {/* project title */}
        <h3 className="font-display text-lg font-bold leading-snug tracking-tight">{projectData.projectTitle}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">{projectData.projectDescription}</p>

        {/* tech stack */}
        <div className="mt-4 flex flex-wrap gap-2">
          {projectData.techStacks.slice(0, 2).map((techStack) => (
            <span key={techStack} className="chip">
              {techStack}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 grid grid-cols-2 gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onView(projectData)}
          >
            View Details
          </button>
          <a
            href={projectData.projectGitHubLink}
            target="_blank"
            className="btn btn-secondary btn-sm group/gh"
          >
            <FaGithub size={15} />
            View Github
            <ArrowUpRight size={14} className="opacity-60 transition-transform group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
