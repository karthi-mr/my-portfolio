import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { RiGraduationCapFill } from "react-icons/ri";
import Education from "../components/Education.tsx";
import SectionHeader from "../components/SectionHeader.tsx";
import { GraduationCap, School } from "lucide-react";
import { SiTicktick } from "react-icons/si";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function About(): ReactElement {
  return (
    <section className="grow flex flex-col gap-20 md:gap-28">
      {/* profile summary */}
      <div className="flex flex-col gap-10">
        <SectionHeader title="About Me" />

        <motion.div {...reveal} className="glass p-6 md:p-10 max-w-4xl mx-auto w-full text-sm md:text-lg leading-relaxed text-muted">
          <p className="mb-4">
            I am a Backend-Focused Full Stack Developer with 4+ years of experience, specializing in building scalable and secure web applications using Java, Spring Boot, React, Angular, and PostgreSQL.
          </p>
          <p className="mb-6">
            I have hands-on experience designing REST APIs, implementing JWT-based authentication, and developing microservices architectures. I enjoy solving real-world problems by building production-style applications that focus on performance, security, and clean architecture.
          </p>
          <div className="mb-6">
            <span className="font-medium text-fg">
              I have built and deployed multiple full stack projects including:
            </span>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-sm md:text-base">
              {[
                "Authentication systems using JWT and role-based access control",
                "Real-time applications using WebSockets",
                "Payment integrations using Razorpay",
                "Microservices architecture with API Gateway and service communication",
                "Dockerized applications for consistent deployment",
              ].map((item: string) => (
                <li
                  key={item}
                  className="flex gap-3 items-start rounded-xl bg-fg/[0.03] ring-1 ring-line p-3"
                >
                  <SiTicktick className="mt-1 shrink-0 text-indigo-500 dark:text-indigo-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mb-4">
            My strengths include backend development, API design, system thinking, and integrating frontend with backend services efficiently.
          </p>
          <p>
            Currently, I am actively looking for opportunities as a Full Stack Developer (Backend Preferred), where I can contribute to building scalable products and continue growing as an engineer.
          </p>
        </motion.div>
      </div>

      {/* why hire me */}
      <div className="flex flex-col gap-10">
        <SectionHeader title="Why Hire Me?" />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Strong backend fundamentals with real project experience",
            "Ability to build end-to-end applications",
            "Experience with modern tools and production workflows",
            "Quick learner with consistent hands-on development",
          ].map((item: string, index: number) => (
            <motion.li
              key={item}
              {...reveal}
              transition={{ duration: 0.5, delay: 0.08 * index }}
              className="glass card-hover p-6 flex flex-col gap-5"
            >
              <span className="grid place-items-center size-11 rounded-xl bg-brand text-white shadow-lg shadow-indigo-500/25">
                <SiTicktick />
              </span>
              <span className="font-medium leading-snug">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* education */}
      <div className="flex flex-col gap-10">
        {/* title */}
        <div className="flex justify-center items-center gap-3">
          <span className="grid place-items-center size-12 md:size-14 rounded-2xl bg-brand text-white shadow-lg shadow-indigo-500/30">
            <RiGraduationCapFill size={28} />
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-gradient pb-1">Education</h1>
        </div>

        {/* content */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* college */}
          <motion.div
            {...reveal}
            className="lg:col-span-2 relative overflow-hidden glass card-hover p-6 md:p-8 ring-1 ring-amber-400/30"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="relative h-full">
              <Education
                title="Bachelor of Engineering"
                name="Karpagam College of Engineering"
                year="June 2016 - April 2020"
                major="Mechanical Engineering"
                TitleIcon={<GraduationCap size={28} className="text-amber-500 dark:text-amber-300" />}
                marksChild="CGPA: 7.93"
              />
            </div>
          </motion.div>
          {/* 12th */}
          <motion.div {...reveal} className="relative overflow-hidden glass card-hover p-6 md:p-8">
            <div className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-violet-500/15 blur-3xl" />
            <div className="relative h-full">
              <Education
                title="XII Grade (12th)"
                name="Adharsh Vidhyalaya HR SEC School"
                year="June 2015 - April 2016"
                major="Mathematics & Biology"
                TitleIcon={<School size={28} className="text-violet-500 dark:text-violet-300" />}
                marksChild="80.75%"
              />
            </div>
          </motion.div>
          {/* 10th */}
          <motion.div {...reveal} className="relative overflow-hidden glass card-hover p-6 md:p-8">
            <div className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="relative h-full">
              <Education
                title="X Grade (10th)"
                name="Adharsh Vidhyalaya HR SEC School"
                year="June 2013 - April 2014"
                major="General Science"
                TitleIcon={<School size={28} className="text-cyan-600 dark:text-cyan-300" />}
                marksChild="94.4%"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
