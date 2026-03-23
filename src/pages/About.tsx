import type { ReactElement } from "react";
import { RiGraduationCapFill } from "react-icons/ri";
import Education from "../components/Education.tsx";
import { GraduationCap, School } from "lucide-react";
import { SiTicktick } from "react-icons/si";

function About(): ReactElement {
  return (
    <section className="grow flex flex-col items-center justify-start text-wrap">
      <div className="text-sm md:text-lg text-center">
        <h1
          className="text-2xl md:text-5xl tracking-wide mb-3 font-bold bg-linear-to-r from-blue-400
          via-purple-400 to-cyan-400 bg-clip-text text-transparent uppercase"
        >
          About Me
        </h1>
        <hr
          className="w-full h-0.5 border-0 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400"
        />
      </div>
      {/* profile summary */}
      <div className="mt-2 text-sm md:text-lg text-start md:px-[20%] py-2 pb-4">
        <p className="text-slate-300/90 tracking-tight md:tracking-wide mb-2">
          I am a Backend-Focused Full Stack Developer with 4+ years of experience, specializing in building scalable and secure web applications using Java, Spring Boot, React, Angular, and PostgreSQL.
        </p>
        <p className="text-slate-300/90 tracking-tight md:tracking-wide mb-2">
          I have hands-on experience designing REST APIs, implementing JWT-based authentication, and developing microservices architectures. I enjoy solving real-world problems by building production-style applications that focus on performance, security, and clean architecture.
        </p>
        <div className="text-slate-300/90 tracking-tight md:tracking-wide mb-2">
          I have built and deployed multiple full stack projects including:
          <ul className="list-none list-inside">
            <li className="flex gap-2 items-center ml-4 mt-1">
              <SiTicktick />
              <span className="">Authentication systems using JWT and role-based access control</span>
            </li>
            <li className="flex gap-2 items-center ml-4 mt-1">
              <SiTicktick />
              <span className="">Real-time applications using WebSockets</span>
            </li>
            <li className="flex gap-2 items-center ml-4 mt-1">
              <SiTicktick />
              <span className="">Payment integrations using Razorpay</span>
            </li>
            <li className="flex gap-2 items-center ml-4 mt-1">
              <SiTicktick />
              <span className="">Microservices architecture with API Gateway and service communication</span>
            </li>
            <li className="flex gap-2 items-center ml-4 mt-1">
              <SiTicktick />
              <span className="">Dockerized applications for consistent deployment</span>
            </li>
          </ul>
        </div>
        <p className="text-slate-300/90 tracking-tight md:tracking-wide mb-2">
          My strengths include backend development, API design, system thinking, and integrating frontend with backend services efficiently.
        </p>
        <p className="text-slate-300/90 tracking-tight md:tracking-wide mb-2">
          Currently, I am actively looking for opportunities as a Full Stack Developer (Backend Preferred), where I can contribute to building scalable products and continue growing as an engineer.
        </p>
      </div>

      {/* divider */}
      <div className="w-full flex justify-center py-3 my-3">
        <hr className="w-4/5 border-b border-slate-600/40" />
      </div>

      <div className="text-sm md:text-lg text-center">
        <h1
          className="text-2xl md:text-5xl tracking-wide mb-3 font-bold bg-linear-to-r from-blue-400
          via-purple-400 to-cyan-400 bg-clip-text text-transparent uppercase"
        >
          Why Hire Me?
        </h1>
        <hr
          className="w-full h-0.5 border-0 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400"
        />
      </div>

      <div className="mt-2 text-sm md:text-lg md:px-[20%] py-2 pb-4 w-full">
        <div className="text-slate-300/90 tracking-tight md:tracking-wide mb-2">
          <ul className="list-none list-outside">
            <li className="flex gap-2 items-center ml-4 mt-1">
              <SiTicktick />
              <span className="">Strong backend fundamentals with real project experience</span>
            </li>
            <li className="flex gap-2 items-center ml-4 mt-1">
              <SiTicktick />
              <span className="">Ability to build end-to-end applications</span>
            </li>
            <li className="flex gap-2 items-center ml-4 mt-1">
              <SiTicktick />
              <span className="">Experience with modern tools and production workflows</span>
            </li>
            <li className="flex gap-2 items-center ml-4 mt-1">
              <SiTicktick />
              <span className="">Quick learner with consistent hands-on development</span>
            </li>
          </ul>
        </div>
      </div>

      {/* divider */}
      <div className="w-full flex justify-center py-3 my-3">
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
