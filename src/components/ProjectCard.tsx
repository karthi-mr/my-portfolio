import type { MouseEvent, ReactElement } from "react";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight, Star } from "lucide-react";
import type { ProjectDataInput } from "../data/ProjectsData.ts";
import ProjectCover from "./ProjectCover.tsx";
import TechChip from "./TechChip.tsx";
import { toRawImageUrl } from "../utils/ImageUtils.ts";

type ProjectCardProps = {
  projectData: ProjectDataInput;
  onView: (projectData: ProjectDataInput) => void;
}

/** how many technologies to show on the card before "+N more" */
const VISIBLE_TECH_COUNT = 3;

function ProjectCard(
  {
    projectData,
    onView
  }: ProjectCardProps
): ReactElement {
  const imageClass = "w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105";
  const hiddenTechCount: number = Math.max(projectData.techStacks.length - VISIBLE_TECH_COUNT, 0);

  // clicking anywhere on the card opens the details (links and buttons keep their own action);
  // keyboard users use the "View Details" button
  function handleCardClick(e: MouseEvent<HTMLElement>): void {
    if ((e.target as HTMLElement).closest("a, button")) return;
    onView(projectData);
  }

  return (
    <article
      onClick={handleCardClick}
      className="group relative h-full flex flex-col overflow-hidden glass card-hover cursor-pointer"
    >
      {/* image */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-fg/5">
        {projectData.projectImageLinks.length > 0 ? (
          <img
            src={toRawImageUrl(projectData.projectImageLinks[0].projectImageLink)}
            alt={projectData.projectImageLinks[0].imageTitle}
            loading="lazy"
            decoding="async"
            className={imageClass}
          />
        ) : (
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
            <ProjectCover title={projectData.projectTitle} techStacks={projectData.techStacks} />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />

        {/* badges */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {projectData.featured && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-brand px-2 py-1 text-[11px] font-bold text-white shadow-lg shadow-indigo-500/30">
                <Star size={12} className="fill-current" />
                Featured
              </span>
            )}
            {projectData.category && (
              <span className="rounded-lg bg-black/55 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                {projectData.category}
              </span>
            )}
          </div>
          {projectData.demoUrl && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/55 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              Live Demo
            </span>
          )}
        </div>
      </div>

      <div className="flex grow flex-col p-5 md:p-6">
        {/* project title */}
        <h3 className="font-display text-lg font-bold leading-snug tracking-tight">{projectData.projectTitle}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">{projectData.projectDescription}</p>

        {/* tech stack */}
        <div className="mt-4 flex flex-wrap gap-2">
          {projectData.techStacks.slice(0, VISIBLE_TECH_COUNT).map((techStack) => (
            <TechChip key={techStack} name={techStack} />
          ))}
          {hiddenTechCount > 0 && (
            <span className="chip" title={projectData.techStacks.slice(VISIBLE_TECH_COUNT).join(", ")}>
              +{hiddenTechCount} more
            </span>
          )}
        </div>

        <div className="mt-auto pt-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onView(projectData)}
            aria-label={`View details of ${projectData.projectTitle}`}
          >
            View Details
          </button>
          <a
            href={projectData.projectGitHubLink}
            target="_blank"
            rel="noopener noreferrer"
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
