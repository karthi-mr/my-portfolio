import type { ReactElement } from "react";
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
  const imageClass = "w-full h-full object-fill";

  return (
    <div className="relative w-full rounded-2xl border border-slate-800 shadow-lg  backdrop-blur-md overflow-hidden
    group">
      {/* image */}
      <div className="pb-3 relative h-55">
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
        <div className="absolute inset-0 bg-linear-to-t from-[#050a18]/85 via-transparent to-black/30" />
      </div>

      <div className="text-center py-4 px-3">
        {/* project title */}
        <h3 className="text-lg font-semibold text-white">{projectData.projectTitle}</h3>
        <p className="text-sm text-slate-400 py-1">{projectData.projectDescription}</p>

        {/* tech stack */}
        <div className="mt-4 flex flex-wrap gap-2">
          {projectData.techStacks.slice(0, 2).map((techStack) => (
            <span
              key={techStack}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1
              text-xs text-white/85"
            >
              {techStack}
            </span>
          ))}
        </div>
      </div>

      <div
        className="hidden md:absolute inset-0 md:flex flex-col md:flex-row items-center justify-center gap-4 bg-black/30
        -translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0
        group-hover:opacity-100"
      >
        <button
          className="px-3 py-1 border border-blue-600 rounded-2xl bg-blue-700 text-md hover:bg-blue-800
          transition-colors cursor-pointer"
          onClick={() => onView(projectData)}
        >
          View Details
        </button>
        <a
          href={projectData.projectGitHubLink}
          target="_blank"
          className="px-3 py-1 border border-gray-600 rounded-2xl bg-gray-700 text-md hover:bg-gray-800
          transition-colors"
        >
          View Github
        </a>
      </div>
      <div
        className="flex md:hidden flex-col md:flex-row items-center justify-center gap-4 p-3"
      >
        <button
          className="px-3 py-1 border border-blue-600 rounded-2xl bg-blue-700  text-xs md:text-md hover:bg-blue-800
          transition-colors cursor-pointer"
          onClick={() => onView(projectData)}
        >
          View Details
        </button>
        <a
          href={projectData.projectGitHubLink}
          target="_blank"
          className="px-3 py-1 border border-gray-600 rounded-2xl bg-gray-700 text-md hover:bg-gray-800
          transition-colors"
        >
          View Github
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;
