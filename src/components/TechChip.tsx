import type { CSSProperties, ReactElement } from "react";
import { findSkillBrand } from "../utils/SkillGlow.ts";

type TechChipProps = {
  name: string;
  className?: string;
}

/** Technology tag tinted with the tool's brand color (neutral for generic terms like "Unit Testing"). */
function TechChip({ name, className = "" }: TechChipProps): ReactElement {
  const brand = findSkillBrand(name);

  if (!brand) {
    return <span className={`chip ${className}`}>{name}</span>;
  }

  const style = {
    "--accent": brand.color,
    ...(brand.light ? { "--accent-light": brand.light } : {}),
  } as CSSProperties;

  return (
    <span
      style={style}
      className={`brand-tile brand-text inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {name}
    </span>
  );
}

export default TechChip;
