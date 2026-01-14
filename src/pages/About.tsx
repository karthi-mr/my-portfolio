import type { ReactElement } from "react";
import { RiGraduationCapFill } from "react-icons/ri";
import Education from "../components/Education.tsx";
import { GraduationCap, School } from "lucide-react";

const professionalSummary: string = "I’m a Full Stack Developer with hands-on experience in building scalable and " +
  "reliable web applications using Java, Spring Boot, React, Angular, and PostgreSQL. Currently, I work as a " +
  "Software Developer (Automation & Backend) at a startup, where I design and implement Java- and Python-based " +
  "automation systems and REST APIs that improve efficiency and reliability. Previously, I worked as a QA Engineer " +
  "at Zoho Corporation, where I developed a strong quality-first mindset through extensive API and UI testing, " +
  "collaborating closely with developers to deliver robust software. I enjoy transforming ideas into clean, " +
  "maintainable solutions and continuously improving my skills by working on real-world projects and " +
  "modern technologies.";

function About(): ReactElement {
  return (
    <section className="grow flex flex-col items-start justify-start text-wrap">
      {/* profile summary */}
      <div
        className="mt-3 text-sm md:text-lg text-center md:px-[20%] py-3 pb-4"
      >
        <h1
          className="text-2xl md:text-5xl text-white/80 mb-3 tracking-wide font-semibold"
        >
          About Me
        </h1>
        <p
          className="text-slate-300/90 tracking-tight md:tracking-wide"
        >
          {professionalSummary}
        </p>
      </div>

      {/* divider */}
      <div className="w-full flex justify-center py-3">
        <hr className="w-4/5 border-b border-slate-600/40" />
      </div>

      {/* education */}
      <div className="w-full flex flex-col mt-3 px-[2%] md:px-[10%]">
        {/* title */}
        <div className="flex justify-start items-center gap-3 text-3xl md:text-5xl">
          <RiGraduationCapFill size={50} className="text-blue-500" />
          <h1>Education</h1>
        </div>

        {/* content */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-x-4 gap-y-8 justify-center py-5">
          {/* college */}
          <div
            className="lg:col-span-2 relative p-4 rounded-2xl bg-linear-to-br from-[#0b1430] via-[#0f2557]
            to-[#0a1128] border border-yellow-400/40 shadow-[0_0_25px_rgba(234,179,8,0.45)]
            md:hover:shadow-[0_0_55px_rgba(234,179,8,0.7)] transition-all duration-300"
          >
            <Education
              title="Bachelor of Engineering"
              name="Karpagam College of Engineering"
              year="June 2016 - April 2020"
              major="Mechanical Engineering"
              TitleIcon={<GraduationCap size={40} className="text-yellow-300" />}
              marksChild="CGPA: 7.93"
            />
            <div
              className="absolute top-0 left-0 w-full h-full rounded-2xl
              bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.12),transparent_30%)] pointer-events-none"
            />
          </div>
          {/* 12th */}
          <div
            className="relative rounded-2xl p-4 bg-linear-to-br from-[#0b1430] via-[#0d1b3d] to-[#0a1128]
            border border-yellow-400/25 shadow-[0_0_20px_rgba(234,179,8,0.2)]
            md:hover:shadow-[0_0_40px_rgba(234,179,8,0.45)] transition-all duration-300"
          >
            <Education
              title="XII Grade (12th)"
              name="Adharsh Vidhyalaya HR SEC School"
              year="June 2015 - April 2016"
              major="Mathematics & Biology"
              TitleIcon={<School size={40} className="text-amber-300" />}
              marksChild="80.75%"
            />
            <div
              className="absolute top-0 left-0 w-full h-full rounded-2xl
              bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.12),transparent_30%)] pointer-events-none"
            />
          </div>
          {/* 10th */}
          <div
            className="relative rounded-2xl p-4 bg-linear-to-br from-[#0b1430] via-[#0d1b3d] to-[#0a1128]
            border border-yellow-400/25 shadow-[0_0_20px_rgba(234,179,8,0.2)]
            md:hover:shadow-[0_0_40px_rgba(234,179,8,0.45)] transition-all duration-300"
          >
            <Education
              title="X Grade (10th)"
              name="Adharsh Vidhyalaya HR SEC School"
              year="June 2013 - April 2014"
              major="General Science"
              TitleIcon={<School size={40} className="text-cyan-300" />}
              marksChild="94.4%"
            />
            <div
              className="absolute top-0 left-0 w-full h-full rounded-2xl
              bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.12),transparent_30%)] pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
