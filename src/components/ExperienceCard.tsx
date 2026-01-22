import type { ReactElement } from "react";
import type { ExperienceDataInput } from "../data/ExperienceData.ts";
import { CalendarDays } from "lucide-react";

function ExperienceCard(experienceData: ExperienceDataInput): ReactElement {
  return (
    <div className="flex flex-col justify-center gap-1">
      <h1 className="text-lg md:text-xl font-semibold uppercase bg-linear-to-r
          from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
        {experienceData.companyName}
      </h1>
      <h3
        className="text-sm md:text-lg bg-linear-to-r
        from-purple-500 via-yellow-400 to-orange-300 bg-clip-text text-transparent"
      >
        {experienceData.position}
      </h3>
      <div className="flex flex-col md:flex-row items-start gap-1 text-slate-400 md:space-x-1">
        <p className="flex items-center justify-center gap-1">
          <CalendarDays />
          {experienceData.period}
        </p>
        <p className="flex items-center justify-center space-x-1">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span>{experienceData.location}</span>
        </p>
      </div>
      <div
        className="w-full border-b border-slate-600/70 py-2"
      />

      {/* key points */}
      <ul className="px-1 py-3 space-y-2">
        {experienceData.keyPoints.map((point: string, index: number) => (
          <li key={index} className="flex gap-2 text-slate-300">
            <span className="mt-2 h-2 w-4 md:w-2 bg-cyan-400" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceCard;
