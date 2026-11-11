import { type ReactElement, useEffect, useId, useRef, useState } from "react";
import type { ProjectDataInput } from "../data/ProjectsData.ts";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  Images,
  Layers,
  Link2,
  ListChecks,
  Share2,
  X,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Keyboard, Navigation, Pagination, Thumbs, Zoom } from "swiper/modules";
import { toRawImageUrl } from "../utils/ImageUtils.ts";
import { projectSlug } from "../utils/ProjectUtils.ts";
import ProjectCover from "./ProjectCover.tsx";

type ProjectModalProps = {
  /** the open project, or null when the modal is closed */
  projectData: ProjectDataInput | null;
  /** position of the project in the list (0-based) and list length, for "3 / 9" */
  index: number;
  total: number;
  previousTitle?: string;
  nextTitle?: string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

type ShareState = "idle" | "copied" | "failed";

function ProjectModal(
  {
    projectData,
    index,
    total,
    previousTitle,
    nextTitle,
    onClose,
    onPrevious,
    onNext,
  }: ProjectModalProps
): ReactElement {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const lightboxRef = useRef<HTMLDialogElement | null>(null);
  const titleId: string = useId();

  // keep showing the last project while the close animation runs
  const [shownProject, setShownProject] = useState<ProjectDataInput | null>(projectData);
  if (projectData && projectData !== shownProject) {
    setShownProject(projectData);
  }

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [shareState, setShareState] = useState<ShareState>("idle");

  const isOpen: boolean = projectData !== null;
  const images = shownProject?.projectImageLinks ?? [];
  const slug: string = shownProject ? projectSlug(shownProject.projectTitle) : "";

  // every project starts at its first image (the body re-mounts per project, so it also starts at the top)
  const [currentSlug, setCurrentSlug] = useState<string>(slug);
  if (slug !== currentSlug) {
    setCurrentSlug(slug);
    setActiveImage(0);
    setThumbsSwiper(null);
    setShareState("idle");
    setIsLightboxOpen(false);
  }

  // open / close the native dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // lock the page behind the modal so it does not scroll
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => { root.style.overflow = previous; };
  }, [isOpen]);

  // full-screen image viewer
  useEffect(() => {
    const lightbox = lightboxRef.current;
    if (!lightbox) return;
    if (isLightboxOpen && !lightbox.open) lightbox.showModal();
    if (!isLightboxOpen && lightbox.open) lightbox.close();
  }, [isLightboxOpen]);

  async function handleShare(): Promise<void> {
    if (!shownProject) return;
    const url: string = `${window.location.origin}/projects?project=${slug}`;
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title: shownProject.projectTitle, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareState("copied");
    } catch (error: unknown) {
      // the person closed the share sheet: not an error
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareState("failed");
    }
    setTimeout(() => setShareState("idle"), 2000);
  }

  const stats = [
    { icon: <Layers size={16} />, value: shownProject?.techStacks.length ?? 0, label: "Technologies" },
    { icon: <ListChecks size={16} />, value: shownProject?.keyFeatures.length ?? 0, label: "Features" },
    { icon: <Images size={16} />, value: images.length, label: "Screenshots" },
  ].filter((stat) => stat.value > 0);

  // "at a glance" numbers + tech stack: in the side panel on large screens, after the overview on smaller ones
  const projectFacts: ReactElement | null = shownProject && (
    <>
      {/* at a glance */}
      <div className={`grid gap-2 ${stats.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 rounded-xl bg-fg/[0.03] ring-1 ring-line px-2 py-3 text-center">
            <span className="text-indigo-500 dark:text-indigo-400">{stat.icon}</span>
            <span className="font-display text-lg font-bold tabular-nums leading-none">{stat.value}</span>
            <span className="text-[11px] text-subtle">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* tech stack */}
      <section className="flex flex-col gap-3 rounded-2xl ring-1 ring-line p-4">
        <h3 className="font-display text-base font-bold">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {shownProject.techStacks.map((techStack: string, techIndex: number) => (
            <span key={techIndex} className="chip">
              {techStack}
            </span>
          ))}
        </div>
      </section>
    </>
  );

  const shareLabel: string = shareState === "copied" ? "Link copied" : shareState === "failed" ? "Copy failed" : "Share";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      // Esc: let React decide (keeps the URL in sync); ignore cancels coming from the image viewer inside
      onCancel={(e) => { e.preventDefault(); if (e.target === e.currentTarget) onClose(); }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="project-modal fixed inset-0 m-auto w-[calc(100%-1.5rem)] max-w-6xl h-[calc(100dvh-1.5rem)] sm:h-[88dvh] p-0
      rounded-3xl bg-surface-strong text-fg border border-line shadow-2xl overflow-hidden"
    >
      {shownProject && (
        <div key={slug} className="flex flex-col h-full">
          {/* header */}
          <header className="flex items-center gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-line">
            <div className="min-w-0 grow flex flex-col gap-1">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-subtle tabular-nums">
                Project {index + 1} / {total}
              </span>
              <h2 id={titleId} className="font-display text-lg md:text-2xl font-bold tracking-tight leading-snug">
                {shownProject.projectTitle}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                className="icon-btn hidden sm:inline-grid"
                onClick={onPrevious}
                aria-label="Previous project"
                title="Previous project"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="icon-btn hidden sm:inline-grid"
                onClick={onNext}
                aria-label="Next project"
                title="Next project"
              >
                <ChevronRight size={20} />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={onClose}
                aria-label="Close"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </header>

          {/* body */}
          <div className="grow overflow-y-auto overscroll-contain">
            <div className="grid gap-8 px-4 sm:px-6 md:px-8 py-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-10">
              {/* main column */}
              <div className="flex min-w-0 flex-col gap-8">
                {/* gallery */}
                {images.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    <div className="relative group/gallery">
                      <Swiper
                        modules={[Navigation, Pagination, Thumbs, Keyboard, A11y]}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        keyboard={{ enabled: true }}
                        pagination={{ type: "fraction" }}
                        navigation={{ prevEl: ".project-prev", nextEl: ".project-next" }}
                        onSlideChange={(swiper) => setActiveImage(swiper.activeIndex)}
                        spaceBetween={12}
                        className="project-swiper rounded-2xl border border-line bg-fg/[0.03]"
                      >
                        {images.map((imageLink, imageIndex: number) => (
                          <SwiperSlide key={imageLink.projectImageLink}>
                            <button
                              type="button"
                              onClick={() => setIsLightboxOpen(true)}
                              className="block w-full aspect-video cursor-zoom-in"
                              aria-label={`View ${imageLink.imageTitle} full screen`}
                            >
                              <img
                                src={toRawImageUrl(imageLink.projectImageLink)}
                                alt={imageLink.imageTitle}
                                loading={imageIndex === 0 ? "eager" : "lazy"}
                                decoding="async"
                                className="h-full w-full object-contain"
                              />
                            </button>
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      {/* custom arrows */}
                      <button type="button" className="project-prev swiper-arrow" aria-label="Previous image">
                        <ChevronLeft size={22} />
                      </button>
                      <button type="button" className="project-next swiper-arrow" aria-label="Next image">
                        <ChevronRight size={22} />
                      </button>

                      {/* caption + full screen */}
                      <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-2">
                        <span className="rounded-lg bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                          {images[activeImage]?.imageTitle}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsLightboxOpen(true)}
                          className="pointer-events-auto grid place-items-center size-9 rounded-lg bg-black/55 text-white backdrop-blur-sm
                          hover:bg-black/75 transition-colors cursor-pointer"
                          aria-label="View full screen"
                          title="View full screen"
                        >
                          <Expand size={16} />
                        </button>
                      </div>
                    </div>

                    {/* thumbnails */}
                    {images.length > 1 && (
                      <Swiper
                        modules={[Thumbs]}
                        onSwiper={setThumbsSwiper}
                        watchSlidesProgress
                        slidesPerView="auto"
                        spaceBetween={8}
                        className="project-thumbs w-full"
                      >
                        {images.map((imageLink) => (
                          <SwiperSlide key={imageLink.projectImageLink} className="w-24! sm:w-28!">
                            <img
                              src={toRawImageUrl(imageLink.projectImageLink)}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              className="aspect-video w-full rounded-lg border border-line object-cover cursor-pointer"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                  </div>
                ) : (
                  <div className="aspect-video overflow-hidden rounded-2xl border border-line">
                    <ProjectCover title={shownProject.projectTitle} techStacks={shownProject.techStacks} />
                  </div>
                )}

                {/* overview */}
                <section className="flex flex-col gap-3">
                  <h3 className="font-display text-lg md:text-xl font-bold">Overview</h3>
                  <p className="text-muted leading-relaxed md:text-[17px]">
                    {shownProject.projectDescription}
                  </p>
                </section>

                {/* tech stack + numbers (phones / tablets) */}
                <div className="flex flex-col gap-5 lg:hidden">
                  {projectFacts}
                </div>

                {/* key features */}
                <section className="flex flex-col gap-4">
                  <h3 className="font-display text-lg md:text-xl font-bold">
                    Key Features
                  </h3>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {shownProject.keyFeatures.map((keyFeature: string, featureIndex: number) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 rounded-xl bg-fg/[0.03] ring-1 ring-line p-3 text-sm md:text-base text-muted"
                      >
                        <span className="mt-0.5 grid place-items-center size-5 shrink-0 rounded-full bg-brand text-white">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span>{keyFeature}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* previous / next project */}
                <nav aria-label="More projects" className="grid grid-cols-2 gap-3 border-t border-line pt-6">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="group flex flex-col items-start gap-1 rounded-2xl border border-line p-3 sm:p-4 text-left
                    hover:border-indigo-400/50 hover:bg-fg/[0.03] transition-colors cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle">
                      <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> Previous
                    </span>
                    <span className="text-sm font-semibold line-clamp-2">{previousTitle}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="group flex flex-col items-end gap-1 rounded-2xl border border-line p-3 sm:p-4 text-right
                    hover:border-indigo-400/50 hover:bg-fg/[0.03] transition-colors cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle">
                      Next <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-sm font-semibold line-clamp-2">{nextTitle}</span>
                  </button>
                </nav>
              </div>

              {/* side panel */}
              <aside className="hidden lg:flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">
                {projectFacts}

                {/* links (large screens) */}
                <div className="flex flex-col gap-2.5">
                  {shownProject.demoUrl && (
                    <a
                      href={shownProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full"
                    >
                      Live Demo
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                  <a
                    href={shownProject.projectGitHubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary w-full"
                  >
                    <FaGithub size={16} />
                    Visit Github
                  </a>
                  <button type="button" onClick={handleShare} className="btn btn-secondary w-full" aria-live="polite">
                    {shareState === "copied" ? <Check size={16} className="text-emerald-500" /> : <Link2 size={16} />}
                    {shareState === "idle" ? "Copy link to project" : shareLabel}
                  </button>
                </div>
              </aside>
            </div>
          </div>

          {/* footer (phones / tablets): main actions always in reach */}
          <footer className="lg:hidden grid grid-cols-[auto_1fr_1fr] gap-2 px-4 py-3 border-t border-line bg-surface-strong">
            <button
              type="button"
              onClick={handleShare}
              className="btn btn-secondary btn-sm px-3!"
              aria-label={shareLabel}
              title={shareLabel}
            >
              {shareState === "copied" ? <Check size={16} className="text-emerald-500" /> : <Share2 size={16} />}
            </button>
            <a
              href={shownProject.projectGitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-secondary btn-sm ${shownProject.demoUrl ? "" : "col-span-2"}`}
            >
              <FaGithub size={15} />
              Github
            </a>
            {shownProject.demoUrl && (
              <a
                href={shownProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                Live Demo
                <ArrowUpRight size={15} />
              </a>
            )}
          </footer>
        </div>
      )}

      {/* full-screen image viewer (its own dialog, so Esc closes only the viewer) */}
      <dialog
        ref={lightboxRef}
        aria-label="Screenshot viewer"
        onCancel={(e) => { e.preventDefault(); e.stopPropagation(); setIsLightboxOpen(false); }}
        className="lightbox fixed inset-0 m-0 h-dvh w-dvw max-h-none max-w-none p-0 bg-black/95 text-white"
      >
        {isLightboxOpen && images.length > 0 && (
          <div className="relative h-full w-full">
            <Swiper
              modules={[Navigation, Pagination, Zoom, Keyboard, A11y]}
              initialSlide={activeImage}
              zoom={{ maxRatio: 3 }}
              keyboard={{ enabled: true }}
              pagination={{ type: "fraction" }}
              navigation={{ prevEl: ".lightbox-prev", nextEl: ".lightbox-next" }}
              onSlideChange={(swiper) => setActiveImage(swiper.activeIndex)}
              className="lightbox-swiper h-full w-full"
            >
              {images.map((imageLink) => (
                <SwiperSlide key={imageLink.projectImageLink}>
                  <div className="swiper-zoom-container">
                    <img
                      src={toRawImageUrl(imageLink.projectImageLink)}
                      alt={imageLink.imageTitle}
                      className="max-h-[calc(100dvh-7rem)] max-w-[calc(100vw-2rem)] object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button type="button" className="lightbox-prev swiper-arrow" aria-label="Previous image">
              <ChevronLeft size={22} />
            </button>
            <button type="button" className="lightbox-next swiper-arrow" aria-label="Next image">
              <ChevronRight size={22} />
            </button>

            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 p-3 sm:p-4">
              <span className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold backdrop-blur-sm">
                {images[activeImage]?.imageTitle}
                <span className="ml-2 hidden sm:inline text-white/60 font-normal">Double-click / pinch to zoom</span>
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="grid place-items-center size-11 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Close full screen view"
              >
                <X size={22} />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </dialog>
  );
}

export default ProjectModal;
