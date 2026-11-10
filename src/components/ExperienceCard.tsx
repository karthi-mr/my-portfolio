import type { ReactElement } from "react";
import type { ExperienceDataInput } from "../data/ExperienceData.ts";
import { CalendarDays, Check, MapPin } from "lucide-react";

type ExperienceCardProps = ExperienceDataInput & {
  /** hide period/location inside the card (shown beside the timeline on large screens) */
  hideMetaOnLarge?: boolean;
}

function ExperienceCard({ hideMetaOnLarge = false, ...experienceData }: ExperienceCardProps): ReactElement {
  return (
    <div className="flex flex-col gap-4">
      {/* header */}
      <div className="flex items-start gap-3 sm:gap-4">
        <span
          className="grid place-items-center size-10 sm:size-12 md:size-14 shrink-0 rounded-xl sm:rounded-2xl bg-brand text-white
          font-display text-lg sm:text-xl md:text-2xl font-extrabold shadow-lg shadow-indigo-500/30"
          aria-hidden="true"
        >
          {experienceData.companyName.charAt(0)}
        </span>
        <div className="min-w-0 flex flex-col gap-1.5">
          <h1 className="font-display text-lg md:text-xl font-bold tracking-tight leading-snug">
            {experienceData.companyName}
          </h1>
          <h3
            className="w-fit rounded-lg px-2.5 py-1 text-xs md:text-sm font-semibold font-sans
            bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20"
          >
            {experienceData.position}
          </h3>
        </div>
      </div>

      <div className={`flex flex-wrap items-center gap-2 ${hideMetaOnLarge ? "lg:hidden" : ""}`}>
        <p className="chip">
          <CalendarDays size={14} />
          {experienceData.period}
        </p>
        <p className="chip">
          <MapPin size={14} />
          <span>{experienceData.location}</span>
        </p>
      </div>

      <div className="h-px w-full bg-linear-to-r from-line via-line to-transparent" />

      {/* key points */}
      <ul className="space-y-3">
        {experienceData.keyPoints.map((point: string, index: number) => (
          <li key={index} className="flex gap-3 text-sm md:text-[15px] text-muted leading-relaxed">
            <span
              className="mt-0.5 grid place-items-center size-5 shrink-0 rounded-full bg-emerald-500/12
              text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/25"
            >
              <Check size={12} strokeWidth={3} />
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceCard;
