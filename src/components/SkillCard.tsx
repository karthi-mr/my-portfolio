import type { ReactElement } from "react";
import type { SkillCardType } from "../utils/SkillsUtil.ts";
import { categoryGlow } from "../utils/SkillGlow.ts";

function SkillCard({ name, Icon, category }: SkillCardType): ReactElement {
  const glow = categoryGlow[category];

  return (
    <div
      className={`bg-slate-900/60 border border-slate-800 rounded-xl p-6 transition-all flex gap-3
      items-center duration-300 ${glow.border} ${glow.shadow} hover:translate-y-1 
      text-lg md:text-2xl shadow-sm inset-shadow-xs`}
    >
      <Icon
        className={`transition-transform duration-300 group-hover:scale-110 ${glow.icon}`}
        size={40}
      />

      <span className="font-medium mt-2 text-slate-200">
        {name}
      </span>
    </div>
  );
}

export default SkillCard;
