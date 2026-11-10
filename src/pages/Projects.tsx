import { type ReactElement, type Ref, useRef, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard.tsx";
import { type ProjectDataInput, projectsData } from "../data/ProjectsData.ts";
import ProjectModal from "../components/ProjectModal.tsx";
import SectionHeader from "../components/SectionHeader.tsx";

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
      <section className="w-full grow flex flex-col gap-12">
        <SectionHeader title="Projects" subtitle="Projects that I have created" />

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((projectData, index) => (
            <motion.div
              key={projectData.projectTitle}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
            >
              <ProjectCard projectData={projectData} onView={handleViewDetailsClick} />
            </motion.div>
          ))}
        </div>

        {/* modal */}
        <ProjectModal ref={dialogRef} projectData={activeProject} />
      </section>
    </>
  );
}

export default Projects;
