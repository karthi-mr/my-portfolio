import type { ReactElement } from "react";
import type { SkillCardType } from "../data/SkillsData.ts";
import { categoryGlow } from "../utils/SkillGlow.ts";

function SkillCard({ name, Icon, category }: SkillCardType): ReactElement {
  // @ts-expect-error "glow of type any"
  const glow = categoryGlow[category];

  return (
    <div
      className={`group glass card-hover h-full p-5 md:p-6 flex flex-col items-center justify-center gap-4 text-center
      ${glow.border} ${glow.shadow}`}
    >
      <div
        className={`grid place-items-center size-14 md:size-16 rounded-2xl ring-1 transition-transform duration-300
        group-hover:scale-110 group-hover:-rotate-3 ${glow.tile}`}
      >
        <Icon className={`${glow.icon} size-7 md:size-8`} />
      </div>

      <span className="text-sm md:text-base font-semibold">
        {name}
      </span>
    </div>
  );
}

export default SkillCard;
