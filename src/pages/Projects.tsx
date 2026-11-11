import { type ReactElement, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.tsx";
import { type ProjectDataInput, projectsData } from "../data/ProjectsData.ts";
import ProjectModal from "../components/ProjectModal.tsx";
import SectionHeader from "../components/SectionHeader.tsx";
import { projectSlug } from "../utils/ProjectUtils.ts";

const PAGE_TITLE: string = "Projects | Karthi";

function Projects(): ReactElement {
  // the open project lives in the URL (/projects?project=<slug>), so it can be shared
  // and the browser / phone Back button closes the modal instead of leaving the page
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const openedFromList = useRef<boolean>(false);

  const activeSlug: string | null = searchParams.get("project");
  const activeIndex: number = activeSlug
    ? projectsData.findIndex((project: ProjectDataInput) => projectSlug(project.projectTitle) === activeSlug)
    : -1;
  const activeProject: ProjectDataInput | null = activeIndex >= 0 ? projectsData[activeIndex] : null;
  const total: number = projectsData.length;

  // the modal was closed with the Back button: the next close must not go back again
  useEffect(() => {
    if (!activeProject) openedFromList.current = false;
  }, [activeProject]);

  // browser-tab title follows the open project
  useEffect(() => {
    document.title = activeProject ? `${activeProject.projectTitle} | ${PAGE_TITLE}` : PAGE_TITLE;
  }, [activeProject]);

  function showProject(project: ProjectDataInput, replace: boolean): void {
    setSearchParams({ project: projectSlug(project.projectTitle) }, { replace, preventScrollReset: true });
  }

  function handleViewDetailsClick(project: ProjectDataInput): void {
    openedFromList.current = true;
    showProject(project, false);
  }

  function handleClose(): void {
    if (openedFromList.current) {
      // undo the history entry added when the modal opened
      openedFromList.current = false;
      navigate(-1);
    } else {
      // opened from a shared link: just drop the parameter
      setSearchParams({}, { replace: true, preventScrollReset: true });
    }
  }

  function handleStep(step: number): void {
    if (activeIndex < 0) return;
    showProject(projectsData[(activeIndex + step + total) % total], true);
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
        <ProjectModal
          projectData={activeProject}
          index={Math.max(activeIndex, 0)}
          total={total}
          previousTitle={activeIndex >= 0 ? projectsData[(activeIndex - 1 + total) % total].projectTitle : undefined}
          nextTitle={activeIndex >= 0 ? projectsData[(activeIndex + 1) % total].projectTitle : undefined}
          onClose={handleClose}
          onPrevious={() => handleStep(-1)}
          onNext={() => handleStep(1)}
        />
      </section>
    </>
  );
}

export default Projects;
