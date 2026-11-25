import { type ReactElement, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { type SkillCardType, skills } from "../data/SkillsData.ts";
import SectionHeader from "../components/SectionHeader.tsx";
import SkillCard from "../components/SkillCard.tsx";
import MultiSelectFilter, { type FilterOption } from "../components/MultiSelectFilter.tsx";
import { getCategoryIcon } from "../utils/FilterIcons.tsx";

/** "AI/ML" -> "ai-ml" (for heading ids) */
function slug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

type SkillGroup = { category: string; items: SkillCardType[] };

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

  // matching skills grouped by category; groups keep the order of SkillsData.ts, empty groups are hidden
  const skillGroups: SkillGroup[] = useMemo(() => {
    const groups = new Map<string, SkillCardType[]>();
    filteredSkills.forEach((skill: SkillCardType) => {
      const items = groups.get(skill.category);
      if (items) items.push(skill);
      else groups.set(skill.category, [skill]);
    });
    return [...groups.entries()].map(([category, items]) => ({ category, items }));
  }, [filteredSkills]);

  return (
    <section className="grow flex flex-col items-center gap-10">
      <SectionHeader
        title="Skills & Technologies"
        subtitle="Tools I use across AI/ML, data and engineering"
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

      {/* one group per category, each with its own heading and grid */}
      {skillGroups.length > 0 ? (
        <div className="w-full flex flex-col gap-12 md:gap-14">
          {skillGroups.map(({ category, items }) => (
            <motion.section
              key={category}
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              aria-labelledby={`skills-${slug(category)}`}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <span className="grid place-items-center size-9 rounded-xl bg-fg/[0.05] ring-1 ring-line text-indigo-500 dark:text-indigo-300">
                  {getCategoryIcon(category, 18)}
                </span>
                <h2 id={`skills-${slug(category)}`} className="font-display text-xl md:text-2xl font-bold tracking-tight">
                  {category}
                </h2>
                <span className="chip text-xs">{items.length}</span>
                <span aria-hidden="true" className="h-px grow bg-line" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                <AnimatePresence mode="popLayout">
                  {items.map((skill: SkillCardType, index: number) => (
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
              </div>
            </motion.section>
          ))}
        </div>
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
