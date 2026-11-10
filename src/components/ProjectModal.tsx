import { type ForwardedRef, forwardRef, type ReactElement } from "react";
import type { ProjectDataInput } from "../data/ProjectsData.ts";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { toRawImageUrl } from "../utils/ImageUtils.ts";

type ProjectModalProps = {
  projectData: ProjectDataInput | null;
}

const ProjectModal = forwardRef(
  ({
    projectData
   }: ProjectModalProps,
   dialogRef: ForwardedRef<HTMLDialogElement>
  ): ReactElement => {

  function closeModal(): void {
    (dialogRef as React.RefObject<HTMLDialogElement>).current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      className="fixed inset-0 m-auto w-[calc(100%-1.5rem)] max-w-5xl h-[calc(100dvh-1.5rem)] sm:h-[85dvh] p-0 rounded-3xl
      bg-surface-strong text-fg border border-line shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col h-full">
        {/* header */}
        <div className="flex items-center justify-between gap-4 px-5 md:px-8 py-4 border-b border-line">
          <h2 className="font-display text-lg md:text-2xl font-bold tracking-tight">
            {projectData?.projectTitle}
          </h2>
          <button
            className="icon-btn shrink-0"
            onClick={closeModal}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* content */}
        <div className="grow overflow-y-auto px-5 md:px-8 py-6">
          {/* images */}
          {projectData && projectData.projectImageLinks && projectData.projectImageLinks.length > 0 && (
            <div className="mb-8">
              <Swiper
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={1.15}
                breakpoints={{ 768: { slidesPerView: 1.5 } }}
                spaceBetween={20}
                className="project-swiper relative"
                navigation={{
                  prevEl: ".project-prev",
                  nextEl: ".project-next",
                }}
              >
                {/* Custom arrows */}
                <button className="project-prev swiper-arrow" aria-label="Previous image">
                  <ChevronLeft size={22} />
                </button>

                <button className="project-next swiper-arrow" aria-label="Next image">
                  <ChevronRight size={22} />
                </button>
                {projectData?.projectImageLinks.map(imageLink => (
                  <SwiperSlide key={imageLink.imageTitle}>
                    <img
                      src={toRawImageUrl(imageLink.projectImageLink)}
                      alt={imageLink.imageTitle}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-2xl border border-line"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* content */}
          <div className="flex flex-col gap-8">
            <p className="text-muted leading-relaxed md:text-lg">
              {projectData?.projectDescription}
            </p>

            {/* tech stack */}
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-lg md:text-xl font-bold">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {projectData?.techStacks.map((techStack: string, index: number) => (
                  <span key={index} className="chip text-sm!">
                    {techStack}
                  </span>
                ))}
              </div>
            </div>

            {/* key features */}
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-lg md:text-xl font-bold">
                Key Features
              </h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {projectData?.keyFeatures.map((keyFeature: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-fg/[0.03] ring-1 ring-line p-3 text-sm md:text-base text-muted"
                  >
                    <span className="mt-0.5 grid place-items-center size-5 shrink-0 rounded-full bg-brand text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{keyFeature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 px-5 md:px-8 py-4 border-t border-line">
          <a
            href={projectData?.projectGitHubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <FaGithub size={15} />
            Visit Github
          </a>

          {projectData?.demoUrl && (
            <a
              href={projectData.demoUrl}
              target="_blank"
            rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Live Demo
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
});

export default ProjectModal;
