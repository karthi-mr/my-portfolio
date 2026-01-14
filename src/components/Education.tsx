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
    <div className="">
      {/* title, name, year */}
      <div className="flex gap-3 items-start justify-start">
        <div>
          {TitleIcon}
        </div>
        <div className="grow flex flex-col gap-3 items-start justify-start">
          {/* title */}
          <h1 className="text-2xl md:text-4xl font-semibold text-white/90">{title}</h1>
          {/* name */}
          <h2 className="text-sm md:text-xl font-medium text-white/60">{name}</h2>
          <h3
            className="flex gap-2 justify-center items-center text-xs md:text-lg font-medium tracking-tight
            text-slate-400"
          >
            <CalendarDays className="text-slate-500 w-4 h-4 md:w-5 md:h-5" />
            <span>{year}</span>
          </h3>

          <hr className="w-full border border-slate-700" />

          <h4 className="text-sm lg:text-md text-white/70 tracking-wide font-semibold">
            <span className="text-white/90">Major: </span>
            {major}
          </h4>
        </div>
        {/* marks */}
        <div className="absolute right-2">
          <div className="px-1.5 md:px-3 py-1 tracking-wide text-xs md:text-sm bg-green-600/60 text-white/90 rounded-2xl">
            <span>{marksChild}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
