import { type ReactElement, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { type Category, type SkillCardType, skills } from "../data/SkillsData.ts";
import SectionHeader from "../components/SectionHeader.tsx";
import SkillCard from "../components/SkillCard.tsx";
import SkillFilterButton from "../components/SkillFilterButton.tsx";

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
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return skills;
    return skills.filter(skill => skill.category === activeCategory);
  }, [activeCategory]);

  function handleCategorySearch(category: Category): void {
    setActiveCategory(category);
  }

  return (
    <section className="grow flex flex-col items-center gap-10">
      <SectionHeader
        title="Skills & Technologies"
        subtitle="Technologies I use to build scalable and production-ready applications"
      />

      {/* filter */}
      <div
        className="glass p-1.5 flex flex-wrap justify-center items-center gap-1"
      >
        <SkillFilterButton
          category="All"
          handleClick={handleCategorySearch}
          activeCategory={activeCategory}
        >
          All
        </SkillFilterButton>
        <SkillFilterButton
          category="Frontend"
          handleClick={handleCategorySearch}
          activeCategory={activeCategory}
        >
          Frontend
        </SkillFilterButton>
        <SkillFilterButton
          category="Backend"
          handleClick={handleCategorySearch}
          activeCategory={activeCategory}
        >
          Backend
        </SkillFilterButton>
        <SkillFilterButton
          category="Tools"
          handleClick={handleCategorySearch}
          activeCategory={activeCategory}
        >
          Tools
        </SkillFilterButton>
        <SkillFilterButton
          category="Testing"
          handleClick={handleCategorySearch}
          activeCategory={activeCategory}
        >
          Testing
        </SkillFilterButton>
      </div>

      {/* Staggered grid */}
      <motion.div
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
      >
        {filteredSkills.map((skill: SkillCardType) => (
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
