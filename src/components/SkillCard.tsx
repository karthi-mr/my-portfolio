import type { CSSProperties, ReactElement } from "react";
import type { SkillCardType } from "../data/SkillsData.ts";
import { type BrandColor, getSkillBrand } from "../utils/SkillGlow.ts";

function SkillCard({ name, Icon }: SkillCardType): ReactElement {
  const brand: BrandColor = getSkillBrand(name);
  const gradientId: string = `skill-grad-${name.replace(/\W+/g, "-").toLowerCase()}`;
  const style = {
    "--accent": brand.color,
    ...(brand.light ? { "--accent-light": brand.light } : {}),
  } as CSSProperties;

  return (
    <div
      style={style}
      className="group glass brand-card h-full p-5 md:p-6 flex flex-col items-center justify-center gap-4 text-center"
    >
      <div
        className="brand-tile grid place-items-center size-16 md:size-[4.5rem] rounded-2xl transition-transform duration-300
        group-hover:scale-110 group-hover:-rotate-3"
      >
        {brand.gradient && (
          <svg width="0" height="0" className="absolute" aria-hidden="true">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="45%" stopColor={brand.gradient[0]} />
                <stop offset="55%" stopColor={brand.gradient[1]} />
              </linearGradient>
            </defs>
          </svg>
        )}
        <Icon
          className="brand-icon size-8 md:size-9 drop-shadow-sm"
          {...(brand.gradient ? { fill: `url(#${gradientId})` } : {})}
        />
      </div>

      <span className="text-sm md:text-base font-semibold">
        {name}
      </span>
    </div>
  );
}

export default SkillCard;
