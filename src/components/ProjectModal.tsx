import { type ForwardedRef, forwardRef, type ReactElement } from "react";
import type { ProjectDataInput } from "../data/ProjectsData.ts";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

type ProjectModalProps = {
  projectData: ProjectDataInput | null;
  // dialogRef: Ref<HTMLDialogElement>
}

// const ProjectModal = (
//   ({
//      projectData,
//      dialogRef
//    }: ProjectModalProps
//   ): ReactElement => {

const ProjectModal = forwardRef(
  ({
    projectData
   }: ProjectModalProps,
   dialogRef: ForwardedRef<HTMLDialogElement>
  ): ReactElement => {

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      backdrop:bg-black/50 bg-slate-900 transition-all w-full md:w-[80%] text-white h-[80%]"
    >
      <div className="flex flex-col h-full">
        {/* header */}
        <div className="text-lg md:text-xl px-6 py-2 bg-slate-800/20 flex items-center justify-between border-b border-slate-600">
          <h2 className="">
            {projectData?.projectTitle}
          </h2>
          <button
            className="p-3 text-white cursor-pointer"
            onClick={() => (dialogRef as React.RefObject<HTMLDialogElement>).current?.close()}
          >
            <X />
          </button>
        </div>

        {/* content */}
        <div className="grow w-full md:w-[95%] mx-auto px-1 md:px-3 py-2">
          {/* images */}
          <div className="flex items-center py-2">
            {projectData && projectData.projectImageLinks && (
              <Swiper
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={1.5}
                spaceBetween={30}
                className="project-swiper relative"
                navigation={{
                  prevEl: ".project-prev",
                  nextEl: ".project-next",
                }}
              >
                {/* Custom arrows */}
                <button className="project-prev swiper-arrow">
                  <ChevronLeft size={22} />
                </button>

                <button className="project-next swiper-arrow">
                  <ChevronRight size={22} />
                </button>
                {projectData?.projectImageLinks.map(imageLink => (
                  <SwiperSlide key={imageLink.imageTitle}>
                    <img src={`${imageLink.projectImageLink}?raw=true`} alt={imageLink.imageTitle} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* content */}
          <div className="py-2 mx-auto flex flex-col gap-4">
            <p className="text-slate-300">
              {projectData?.projectDescription}
            </p>

            {/* tech stack */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg md:text-2xl font-semibold">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {projectData?.techStacks.map((techStack: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-slate-700 rounded-xl text-xs md:text-sm text-slate-300">
                {techStack}
              </span>
                ))}
              </div>
            </div>

            {/* key features */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg md:text-2xl font-semibold">
                Key Features
              </h2>
              <ul className="list-disc">
                {projectData?.keyFeatures.map((keyFeature: string, index: number) => (
                  <li key={index} className="text-sm md:text-lg">
                    {keyFeature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* footer */}
        <div
          className="mt-auto flex flex-col md:flex-row gap-3 px-5 py-4 border-t border-slate-600 bg-slate-800/20
          text-center"
        >
          <a
            href={projectData?.projectGitHubLink}
            target="_blank"
            className="px-2 py-1 bg-blue-700 rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
          >
            Visit Github
          </a>

          {projectData?.demoUrl && (
            <a
              href={projectData.demoUrl}
              target="_blank"
              className="px-2 py-1 bg-blue-700 rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
});

export default ProjectModal;
