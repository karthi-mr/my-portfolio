import type { ReactElement } from "react";
import type { SkillCardType } from "../utils/SkillsUtil.ts";
import { categoryGlow } from "../utils/SkillGlow.ts";

function SkillCard({ name, Icon, category }: SkillCardType): ReactElement {
  const glow = categoryGlow[category];

  return (
    <div
      className={`group bg-slate-900/60 border border-slate-800 rounded-xl p-6 transition-all duration-300 h-full
      ${glow.border} ${glow.shadow} hover:translate-y-1 text-lg md:text-2xl shadow-sm inset-shadow-xs auto-rows-fr`}
    >
      <div className="flex gap-3 items-center justify-center h-full">
        <Icon
          className={`transition-transform duration-300 group-hover:scale-110 ${glow.icon} size-8 md:size-10`}
        />

        <span className="text-sm md:text-lg font-medium mt-2 text-slate-200">
          {name}
        </span>
      </div>
    </div>
  );
}

export default SkillCard;
