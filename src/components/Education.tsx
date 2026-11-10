import type { ReactElement } from "react";
import { CalendarDays } from "lucide-react";

type EducationProps = {
  title: string;
  name: string;
  year: string;
  major: string;
  TitleIcon: ReactElement;
  marksChild: string;
}

function Education({ title, name, year, major, TitleIcon, marksChild }: EducationProps): ReactElement {
  return (
    <div className="flex flex-col h-full">
      {/* title, name, year */}
      <div className="flex items-start justify-between gap-3">
        <div className="grid place-items-center size-12 md:size-14 shrink-0 rounded-2xl bg-fg/5 ring-1 ring-line">
          {TitleIcon}
        </div>
        {/* marks */}
        <div
          className="px-3 py-1 text-xs md:text-sm font-semibold tracking-wide rounded-full
          bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/25"
        >
          <span>{marksChild}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {/* title */}
        <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight">{title}</h1>
        {/* name */}
        <h2 className="text-sm md:text-base font-medium text-muted">{name}</h2>
        <h3 className="flex gap-2 items-center text-xs md:text-sm font-medium text-subtle font-sans">
          <CalendarDays className="w-4 h-4" />
          <span>{year}</span>
        </h3>
      </div>

      <hr className="my-4 border-line" />

      <h4 className="mt-auto text-sm text-muted font-sans">
        <span className="font-semibold text-fg">Major: </span>
        {major}
      </h4>
    </div>
  );
}

export default Education;
