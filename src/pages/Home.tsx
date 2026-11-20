import { ArrowRight, Download, Phone } from "lucide-react";
import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../assets/profile.webp";
import ProjectCard from "../components/ProjectCard.tsx";
import CopyEmailButton from "../components/CopyEmailButton.tsx";
import StatCounter from "../components/StatCounter.tsx";
import { type ProjectDataInput, projectsData } from "../data/ProjectsData.ts";
import { certificatesData } from "../data/CertificatesData.ts";
import { skills } from "../data/SkillsData.ts";
import { CONTACT } from "../data/ContactData.ts";
import { projectSlug } from "../utils/ProjectUtils.ts";

// career summary (details are on the Experience page)
const CAREER_PATH: { period: string; title: string; detail: string; current?: boolean }[] = [
  { period: "Jun 2026 – now", title: "Senior Data Scientist", detail: "AI/ML", current: true },
  { period: "2024 – 2026", title: "AquilaTest: Data Analyst → Automation & Backend Developer", detail: "Data insights, Java & Python automation, framework re-architecture" },
  { period: "2020 – 2023", title: "Zoho: QA Engineer (Member Technical Staff)", detail: "API & UI testing, automated test cases" },
];

// what my personal projects cover (see the Projects page)
const PROJECT_HIGHLIGHTS: string[] = [
  "JWT auth & role-based access",
  "Microservices",
  "WebSockets",
  "Razorpay payments",
  "Docker",
  "NLP with IBM Watson",
];

// shown as separate items so a line only ever breaks between them
const ROLES: string[] = ["Senior Data Scientist", "AI/ML", "NLP", "Python"];

// numbers come from the data files, so they stay correct when you add projects / certificates / skills
const STATS: { value: number; suffix?: string; label: string }[] = [
  { value: 4, suffix: "+", label: "Years of experience" },
  { value: projectsData.length, label: "Projects" },
  { value: certificatesData.length, label: "Certificates" },
  { value: skills.length, label: "Skills & tools" },
];

// projects marked `featured: true` in ProjectsData.ts (max 3) are shown on the home page
const featuredProjects: ProjectDataInput[] = projectsData.filter((project: ProjectDataInput) => project.featured).slice(0, 3);

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function Home(): ReactElement {
  const navigate = useNavigate();

  return (
    <>
      {/* hero */}
      <motion.section
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
        className="grow grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center"
      >
        {/* title */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* current role */}
          <motion.p
            variants={fadeUp}
            className="chip font-display text-sm! py-1.5! px-4! mb-6"
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">Currently</span> Senior Data Scientist
            </span>
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl xl:text-7xl font-extrabold tracking-tight leading-[1.05]"
          >
            Hi, I'm <span className="text-gradient">Karthi</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1 font-display text-lg md:text-2xl font-semibold tracking-tight text-fg/85"
          >
            {ROLES.map((role: string, index: number) => (
              <span key={role} className="inline-flex items-center gap-3 whitespace-nowrap">
                {index > 0 && <span className="text-subtle font-normal" aria-hidden="true">·</span>}
                {role}
              </span>
            ))}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-base md:text-lg text-muted font-sans font-normal text-balance"
          >
            Working on AI/ML as a Senior Data Scientist, after 4+ years in QA and test automation, data analysis,
            and Java &amp; Python automation and backend engineering.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2">
            <CopyEmailButton email={CONTACT.email} />
            <a href={CONTACT.phoneLink} className="chip text-sm! py-1.5! hover:text-fg hover:border-indigo-400/50 transition-colors">
              <Phone size={14} className="text-cyan-500" />
              <span>{CONTACT.phoneDisplay}</span>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
          >
            <Link
              to="/projects"
              className="btn btn-primary group"
            >
              <span>View Projects</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={CONTACT.resume}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <span><Download size={18} /></span>
              <span>Download Resume</span>
            </a>
            <Link
              to="/contact"
              className="btn btn-secondary"
            >
              <span>Contact Me</span>
            </Link>
          </motion.div>

          {/* profiles */}
          <motion.div variants={fadeUp} className="mt-5 flex items-center gap-2">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn hover:text-white! hover:border-transparent! hover:bg-brand"
              aria-label="GitHub profile"
              title="GitHub"
            >
              <FaGithub aria-hidden="true" size={18} />
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn hover:text-white! hover:border-transparent! hover:bg-brand"
              aria-label="LinkedIn profile"
              title="LinkedIn"
            >
              <FaLinkedin aria-hidden="true" size={18} />
            </a>
          </motion.div>
        </div>

        {/* profile picture: shown immediately (no fade-in), so it appears as early as possible */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative size-44 sm:size-56 lg:size-80">
            {/* glow behind */}
            <div className="absolute -inset-8 rounded-full bg-brand opacity-30 blur-3xl" />
            {/* rotating ring */}
            <div
              className="absolute -inset-1.5 rounded-full animate-spin-slow
              bg-[conic-gradient(from_0deg,#6366f1,#8b5cf6,#06b6d4,#22d3ee,#6366f1)]"
            />
            {/* circle frame */}
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-bg bg-surface">
              <img
                src={profileImg}
                width={614}
                height={566}
                fetchPriority="high"
                alt="Profile"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* short summary */}
      <section className="mt-16 md:mt-24 grid gap-5 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass card-hover p-6 md:p-8"
        >
          <h2 className="font-display text-lg md:text-xl font-semibold">My path</h2>
          <ol className="mt-5 relative flex flex-col gap-5 before:absolute before:left-[0.6rem] before:top-2 before:bottom-2 before:w-px before:bg-line">
            {CAREER_PATH.map((step) => (
              <li key={step.period} className="relative flex gap-4">
                <span
                  className={`relative z-10 mt-1.5 size-[1.2rem] shrink-0 rounded-full ring-4 ring-bg ${step.current ? "bg-brand" : "bg-fg/15"}`}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-subtle tabular-nums">{step.period}</span>
                  <span className="font-semibold text-fg">{step.title}</span>
                  <span className="text-sm text-muted">{step.detail}</span>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 pt-5 border-t border-line">
            <h3 className="text-sm font-semibold text-fg">Built in my projects</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {PROJECT_HIGHLIGHTS.map((item: string) => (
                <li key={item} className="chip">{item}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* stats: count up when scrolled into view */}
        <ul className="grid grid-cols-2 gap-5" aria-label="At a glance">
          {STATS.map((stat) => (
            <li key={stat.label}>
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </li>
          ))}
        </ul>
      </section>

      {/* featured projects */}
      {featuredProjects.length > 0 && (
        <section className="mt-20 md:mt-28 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight">
                Featured <span className="text-gradient">Projects</span>
              </h2>
            </div>
            <Link to="/projects" className="btn btn-secondary btn-sm self-start sm:self-auto group">
              View all projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project: ProjectDataInput, index: number) => (
              <motion.div
                key={project.projectTitle}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <ProjectCard
                  headingLevel={3}
                  projectData={project}
                  onView={(selected: ProjectDataInput) => navigate(`/projects?project=${projectSlug(selected.projectTitle)}`)}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
