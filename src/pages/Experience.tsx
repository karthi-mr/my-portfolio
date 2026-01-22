import type { ReactElement } from "react";
import { experienceData } from "../data/ExperienceData.ts";
import ExperienceCard from "../components/ExperienceCard.tsx";

function Experience(): ReactElement {
  return (
    <>
      <section className="grow flex flex-col items-center justify-start py-4">
        <div className="text-sm md:text-lg text-center ">
          <h1
            className="text-2xl md:text-5xl tracking-wide mb-3 font-bold bg-linear-to-r
          from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent uppercase"
          >
            Experience
          </h1>
          <hr
            className="w-full h-0.5 border-0 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400"
          />
          <p className="my-4 text-slate-400 text-xs md:text-sm">
            Experience I gained
          </p>
        </div>

        {/* content */}
        <div className="w-full flex relative justify-center">
          {/* vertical line */}
          <div className="w-2 bg-linear-to-b
          from-red-400 via-yellow-400 to-green-400 rounded-full mr-6" />

          {/* box 1 */}
          <div className="flex flex-col space-y-15">
            {experienceData.map(experience => (
              <div key={experience.id} className="relative">
                {/* Connector */}
                <div className="absolute -left-6 top-[25%] w-6 h-0.5 bg-blue-500" />

                <div className="bg-slate-900 border border-blue-400 rounded-lg p-4">

                    <ExperienceCard {...experience} />

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default Experience;
