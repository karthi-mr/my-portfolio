import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experienceData } from "../data/ExperienceData.ts";
import ExperienceCard from "../components/ExperienceCard.tsx";
import SectionHeader from "../components/SectionHeader.tsx";

function Experience(): ReactElement {
  return (
    <>
      <section className="grow flex flex-col gap-12">
        <SectionHeader
          title="Experience"
          subtitle="My journey in building scalable systems and solutions"
        />

        {/* content */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* vertical line */}
          <div
            className="absolute left-5 md:left-6 top-2 bottom-2 w-0.5 -translate-x-1/2 rounded-full
            bg-linear-to-b from-indigo-500 via-violet-500 to-cyan-500/0"
          />

          <ol className="flex flex-col gap-8">
            {experienceData.map((experience, index: number) => (
              <motion.li
                key={experience.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative pl-14 md:pl-20"
              >
                {/* Connector */}
                <span
                  className="absolute left-5 md:left-6 top-6 -translate-x-1/2 grid place-items-center size-10 md:size-12
                  rounded-2xl bg-brand text-white shadow-lg shadow-indigo-500/30 ring-4 ring-bg"
                >
                  <Briefcase size={18} />
                </span>

                <div className="glass card-hover p-5 md:p-8">
                  <ExperienceCard {...experience} />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

export default Experience;
