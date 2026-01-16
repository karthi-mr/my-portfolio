import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { type SkillCardType, skills } from "../utils/SkillsUtil.ts";
import SkillCard from "../components/SkillCard.tsx";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
  }
};

// const transition = { duration: 0.4, ease: "easeInOut" }

function Skills(): ReactElement {
  return (
    <section className="grow flex flex-col items-center justify-start py-6">
      <div className="text-sm md:text-lg text-center">
        <h1
          className="text-2xl md:text-5xl tracking-wide mb-3 font-bold bg-linear-to-r
          from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Skills & Technologies
        </h1>
        <hr
          className="w-full h-0.5 border-0 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400"
        />
        <p className="my-4 text-slate-400 text-xs md:text-sm">
          Tools and technologies I use to build modern applications
        </p>
      </div>

      {/* Staggered grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="w-[80%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6"
      >
        {skills.map((skill: SkillCardType) => (

          <motion.div
            key={skill.name}
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <SkillCard
              name={skill.name}
              Icon={skill.Icon}
              category={skill.category}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Skills;
