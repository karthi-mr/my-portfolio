import { lazy, type ReactElement, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.tsx";
import { type ProjectDataInput, projectsData } from "../data/ProjectsData.ts";
import SectionHeader from "../components/SectionHeader.tsx";
import MultiSelectFilter, { type FilterOption } from "../components/MultiSelectFilter.tsx";
import { projectSlug } from "../utils/ProjectUtils.ts";
import { getCategoryIcon } from "../utils/FilterIcons.tsx";
import { findSkillBrand } from "../utils/SkillGlow.ts";

// the modal (and its image-slider library) is downloaded only when a project is first opened
const ProjectModal = lazy(() => import("../components/ProjectModal.tsx"));

const PAGE_TITLE: string = "Projects | Karthi";
const CATEGORY_PREFIX: string = "category:";
const TECH_PREFIX: string = "tech:";

// featured projects first, otherwise keep the order from the data file
const orderedProjects: ProjectDataInput[] = [
  ...projectsData.filter((project: ProjectDataInput) => project.featured),
  ...projectsData.filter((project: ProjectDataInput) => !project.featured),
];

function Projects(): ReactElement {
  // the open project lives in the URL (/projects?project=<slug>), so it can be shared
  // and the browser / phone Back button closes the modal instead of leaving the page
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const openedFromList = useRef<boolean>(false);

  // filters: empty selection = show everything
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");

  const activeSlug: string | null = searchParams.get("project");
  const activeIndex: number = activeSlug
    ? orderedProjects.findIndex((project: ProjectDataInput) => projectSlug(project.projectTitle) === activeSlug)
    : -1;
  const activeProject: ProjectDataInput | null = activeIndex >= 0 ? orderedProjects[activeIndex] : null;
  const total: number = orderedProjects.length;

  // mount the modal on first open and keep it mounted (so it can animate closed)
  const [modalLoaded, setModalLoaded] = useState<boolean>(activeProject !== null);
  if (activeProject && !modalLoaded) {
    setModalLoaded(true);
  }

  // filter options are built from the data, so new categories / technologies show up automatically
  const filterOptions: FilterOption[] = useMemo(() => {
    const categories = new Map<string, number>();
    const technologies = new Map<string, number>();
    projectsData.forEach((project: ProjectDataInput) => {
      if (project.category) categories.set(project.category, (categories.get(project.category) ?? 0) + 1);
      new Set(project.techStacks).forEach(tech => technologies.set(tech, (technologies.get(tech) ?? 0) + 1));
    });

    const byCountThenName = (a: [string, number], b: [string, number]) => b[1] - a[1] || a[0].localeCompare(b[0]);

    const categoryOptions: FilterOption[] = [...categories.entries()].sort(byCountThenName).map(([category, count]) => ({
      value: CATEGORY_PREFIX + category,
      label: category,
      count,
      icon: getCategoryIcon(category),
      group: "Category",
    }));

    const technologyOptions: FilterOption[] = [...technologies.entries()].sort(byCountThenName).map(([tech, count]) => {
      const brand = findSkillBrand(tech);
      return {
        value: TECH_PREFIX + tech,
        label: tech,
        count,
        icon: <span className="size-2.5 rounded-full" style={{ backgroundColor: brand?.light ?? brand?.color ?? "var(--subtle)" }} />,
        group: "Technology",
      };
    });

    return [...categoryOptions, ...technologyOptions];
  }, []);

  const filteredProjects: ProjectDataInput[] = useMemo(() => {
    const categories: string[] = selectedFilters.filter(value => value.startsWith(CATEGORY_PREFIX)).map(value => value.slice(CATEGORY_PREFIX.length));
    const technologies: string[] = selectedFilters.filter(value => value.startsWith(TECH_PREFIX)).map(value => value.slice(TECH_PREFIX.length));
    const q: string = query.trim().toLowerCase();

    return orderedProjects.filter((project: ProjectDataInput) =>
      // any of the chosen categories AND any of the chosen technologies
      (categories.length === 0 || (project.category !== undefined && categories.includes(project.category)))
      && (technologies.length === 0 || project.techStacks.some(tech => technologies.includes(tech)))
      && (!q || [project.projectTitle, project.projectDescription, project.category ?? "", ...project.techStacks]
        .some(text => text.toLowerCase().includes(q))));
  }, [selectedFilters, query]);

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
    showProject(orderedProjects[(activeIndex + step + total) % total], true);
  }

  function clearFilters(): void {
    setSelectedFilters([]);
    setQuery("");
  }

  return (
    <>
      <section className="w-full grow flex flex-col items-center gap-10">
        <SectionHeader title="Projects" subtitle="Projects that I have created" />

        {/* filter */}
        <MultiSelectFilter
          title="Filter"
          options={filterOptions}
          selected={selectedFilters}
          onSelectedChange={setSelectedFilters}
          query={query}
          onQueryChange={setQuery}
          searchPlaceholder="Search projects or technologies..."
          shownCount={filteredProjects.length}
          totalCount={total}
        />

        {filteredProjects.length > 0 ? (
          <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((projectData: ProjectDataInput, index: number) => (
                <motion.div
                  key={projectData.projectTitle}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(index * 0.05, 0.3) }}
                >
                  <ProjectCard projectData={projectData} onView={handleViewDetailsClick} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-16 text-center text-muted">
            <SearchX size={40} className="text-subtle" />
            <p>No projects match your filters.</p>
            <button type="button" className="btn btn-secondary btn-sm" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}

        {/* modal */}
        {modalLoaded && (
          <Suspense fallback={null}>
            <ProjectModal
              projectData={activeProject}
              index={Math.max(activeIndex, 0)}
              total={total}
              previousTitle={activeIndex >= 0 ? orderedProjects[(activeIndex - 1 + total) % total].projectTitle : undefined}
              nextTitle={activeIndex >= 0 ? orderedProjects[(activeIndex + 1) % total].projectTitle : undefined}
              onClose={handleClose}
              onPrevious={() => handleStep(-1)}
              onNext={() => handleStep(1)}
            />
          </Suspense>
        )}
      </section>
    </>
  );
}

export default Projects;
