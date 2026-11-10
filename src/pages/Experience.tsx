import { type ReactElement, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { MapPin } from "lucide-react";
import { experienceData } from "../data/ExperienceData.ts";
import ExperienceCard from "../components/ExperienceCard.tsx";
import SectionHeader from "../components/SectionHeader.tsx";

function Experience(): ReactElement {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <>
      <section className="grow flex flex-col gap-14">
        <SectionHeader
          title="Experience"
          subtitle="My journey in building scalable systems and solutions"
        />

        {/* content */}
        <div ref={timelineRef} className="relative w-full max-w-5xl mx-auto">
          {/* vertical line: faint track + gradient that fills while scrolling */}
          <div className="absolute left-3 sm:left-5 lg:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 rounded-full bg-line" />
          <motion.div
            style={{ scaleY: lineProgress }}
            className="absolute left-3 sm:left-5 lg:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 origin-top rounded-full
            bg-linear-to-b from-indigo-500 via-violet-500 to-cyan-400 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
          />

          <ol className="flex flex-col gap-10 lg:gap-14">
            {experienceData.map((experience, index: number) => {
              const isLeft: boolean = index % 2 === 0;

              return (
                <li key={experience.id} className="relative grid lg:grid-cols-2 lg:gap-20 pl-9 sm:pl-14 lg:pl-0">
                  {/* Connector */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute left-3 sm:left-5 lg:left-1/2 top-7 sm:top-8 -translate-x-1/2 grid place-items-center size-5 sm:size-6 rounded-full
                    bg-bg ring-2 ring-violet-500/70 z-10"
                  >
                    <span className="size-2.5 rounded-full bg-brand" />
                    {index === 0 && (
                      <span className="absolute inset-0 rounded-full ring-2 ring-violet-500/50 animate-ping" />
                    )}
                  </motion.span>

                  {/* period & location beside the line (large screens) */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`hidden lg:flex flex-col gap-2 pt-6 ${isLeft
                      ? "lg:col-start-2 lg:row-start-1 items-start"
                      : "lg:col-start-1 lg:row-start-1 items-end text-right"}`}
                  >
                    <span className="inline-flex items-center gap-2 font-display text-2xl xl:text-3xl font-extrabold tracking-tight text-gradient">
                      {experience.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                      <MapPin size={14} />
                      {experience.location}
                    </span>
                  </motion.div>

                  {/* card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className={`relative ${isLeft ? "lg:col-start-1" : "lg:col-start-2"} lg:row-start-1`}
                  >
                    {/* pointer toward the timeline */}
                    <span
                      className={`hidden lg:block absolute top-8 size-4 rotate-45 border-line bg-surface-strong ${isLeft
                        ? "-right-2 border-t border-r"
                        : "-left-2 border-b border-l"}`}
                    />
                    <div className="group relative overflow-hidden glass card-hover p-4 sm:p-6 md:p-8">
                      {/* top accent */}
                      <span className="absolute inset-x-0 top-0 h-1 bg-brand opacity-80" />
                      {/* soft glow */}
                      <span
                        className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-violet-500/10 blur-3xl
                        transition-opacity duration-500 opacity-60 group-hover:opacity-100"
                      />
                      <div className="relative">
                        <ExperienceCard {...experience} hideMetaOnLarge />
                      </div>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}

export default Experience;
