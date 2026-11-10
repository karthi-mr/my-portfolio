import { type ReactElement, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { type SkillCardType, skills } from "../data/SkillsData.ts";
import SectionHeader from "../components/SectionHeader.tsx";
import SkillCard from "../components/SkillCard.tsx";
import MultiSelectFilter, { type FilterOption } from "../components/MultiSelectFilter.tsx";
import { getCategoryIcon } from "../utils/FilterIcons.tsx";

function Skills(): ReactElement {
  // empty selection = show every category
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");

  // filter options are built from the data, so new categories show up automatically
  const categoryOptions: FilterOption[] = useMemo(() => {
    const counts = new Map<string, number>();
    skills.forEach(skill => counts.set(skill.category, (counts.get(skill.category) ?? 0) + 1));
    return [...counts.entries()].map(([category, count]) => ({
      value: category,
      label: category,
      count,
      icon: getCategoryIcon(category),
    }));
  }, []);

  const filteredSkills: SkillCardType[] = useMemo(() => {
    const q: string = query.trim().toLowerCase();
    return skills.filter(skill =>
      (selectedCategories.length === 0 || selectedCategories.includes(skill.category))
      && (!q || skill.name.toLowerCase().includes(q) || skill.category.toLowerCase().includes(q)));
  }, [selectedCategories, query]);

  return (
    <section className="grow flex flex-col items-center gap-10">
      <SectionHeader
        title="Skills & Technologies"
        subtitle="Technologies I use to build scalable and production-ready applications"
      />

      {/* filter */}
      <MultiSelectFilter
        title="Category"
        options={categoryOptions}
        selected={selectedCategories}
        onSelectedChange={setSelectedCategories}
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search skills..."
        shownCount={filteredSkills.length}
        totalCount={skills.length}
      />

      {/* Staggered grid */}
      {filteredSkills.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill: SkillCardType, index: number) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(index * 0.03, 0.3) }}
              >
                <SkillCard
                  name={skill.name}
                  Icon={skill.Icon}
                  category={skill.category}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center text-muted">
          <SearchX size={40} className="text-subtle" />
          <p>No skills match your filters.</p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => { setSelectedCategories([]); setQuery(""); }}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}

export default Skills;
