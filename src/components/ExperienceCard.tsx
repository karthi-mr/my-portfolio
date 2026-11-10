import type { ReactElement } from "react";
import type { ExperienceDataInput } from "../data/ExperienceData.ts";
import { CalendarDays, MapPin } from "lucide-react";

function ExperienceCard(experienceData: ExperienceDataInput): ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-display text-lg md:text-2xl font-bold tracking-tight">
        {experienceData.companyName}
      </h1>
      <h3 className="text-sm md:text-lg font-semibold text-gradient w-fit">
        {experienceData.position}
      </h3>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <p className="chip">
          <CalendarDays size={14} />
          {experienceData.period}
        </p>
        <p className="chip">
          <MapPin size={14} />
          <span>{experienceData.location}</span>
        </p>
      </div>

      <div className="my-3 h-px w-full bg-line" />

      {/* key points */}
      <ul className="space-y-3">
        {experienceData.keyPoints.map((point: string, index: number) => (
          <li key={index} className="flex gap-3 text-sm md:text-base text-muted leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand ring-4 ring-indigo-500/10" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceCard;
