import { type ReactElement, type Ref, useRef, useState } from "react";
import ProjectCard from "../components/ProjectCard.tsx";
import { type ProjectDataInput, projectsData } from "../data/ProjectsData.ts";
import ProjectModal from "../components/ProjectModal.tsx";

function Projects(): ReactElement {
  const dialogRef: Ref<HTMLDialogElement | null> = useRef(null);
  const [activeProject, setActiveProject] = useState<ProjectDataInput | null>(null);

  function openModal() {
    // @ts-expect-error showModal
    dialogRef.current?.showModal();
  }

  function handleViewDetailsClick(project: ProjectDataInput): void {
    setActiveProject(project);
    openModal();
  }

  return (
    <>
      <section className="w-full grow flex flex-col items-center justify-start">
        <div className="text-sm md:text-lg text-center">
          <h1
            className="text-2xl md:text-5xl tracking-wide mb-3 font-bold bg-linear-to-r
          from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent uppercase"
          >
            Projects
          </h1>
          <hr
            className="w-full h-0.5 border-0 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400"
          />
          <p className="my-4 text-slate-400 text-xs md:text-sm">
            Projects that I have created
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto px-6 pb-16">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map(projectData => (
                <ProjectCard key={projectData.projectTitle} projectData={projectData} onView={handleViewDetailsClick}  />
            ))}
          </div>
        </div>

        {/* modal */}
        <ProjectModal ref={dialogRef} projectData={activeProject} />
      </section>
    </>
  );
}

export default Projects;
