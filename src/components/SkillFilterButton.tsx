import type { ReactElement } from "react";
import { motion } from "framer-motion";
import type { Category } from "../data/SkillsData.ts";

type SkillFilterButtonProps = {
  children: string | ReactElement,
  category: Category;
  activeCategory: Category;
  handleClick: (category: Category) => void;
}

function SkillFilterButton({ children, handleClick, category, activeCategory }: SkillFilterButtonProps): ReactElement {
  const isActive: boolean = category === activeCategory;

  return (
    <button
      className={`relative px-4 py-2 text-sm md:text-base font-semibold rounded-xl cursor-pointer
      transition-colors active:scale-95 ${isActive ? "text-white" : "text-muted hover:text-fg"}`}
      onClick={() => handleClick(category)}
    >
      {isActive && (
        <motion.span
          layoutId="skill-filter-pill"
          className="absolute inset-0 rounded-xl bg-brand shadow-lg shadow-indigo-500/30"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

export default SkillFilterButton;
