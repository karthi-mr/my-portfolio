import { ArrowRight, Download, Mail, Phone } from "lucide-react";
import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { SiTicktick } from "react-icons/si";
import { Link } from "react-router-dom";
import profileImg from "../assets/profile2.jpg";

const RESUME_PDF_URL: string = "https://drive.google.com/file/d/1FRiH7XiIytaEKxQnIZDgSNuoj48Ly_4X/view?usp=sharing";

const SUB_TITLE: string = "Full Stack Developer | Spring Framework | React | Angular";
const mobileNumber: string = "+91 7708006145"
const mailId: string = "mkarthim1998@gmail.com"

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function Home(): ReactElement {
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
          {/* improving points */}
          <motion.h2
            variants={fadeUp}
            className="chip text-sm! py-1.5! px-4! mb-6"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>
              <span className="font-semibold text-amber-500 dark:text-amber-400">Backend-Focused</span> Full Stack Developer
            </span>
          </motion.h2>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl xl:text-7xl font-extrabold tracking-tight leading-[1.05]"
          >
            Hi, I'm <span className="text-gradient">Karthi</span>
          </motion.h1>

          <motion.h3
            variants={fadeUp}
            className="mt-5 text-lg md:text-2xl font-semibold tracking-tight text-fg/85"
          >
            {SUB_TITLE}
          </motion.h3>

          <motion.h3
            variants={fadeUp}
            className="mt-4 max-w-xl text-base md:text-lg text-muted font-sans font-normal"
          >
            Building scalable web applications using Java, Spring Boot, React and PostgreSQL
          </motion.h3>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2">
            <span className="chip text-sm! py-1.5!">
              <Mail size={14} className="text-indigo-500" />
              <span>{mailId}</span>
            </span>
            <span className="chip text-sm! py-1.5!">
              <Phone size={14} className="text-cyan-500" />
              <span>{mobileNumber}</span>
            </span>
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
              href={RESUME_PDF_URL}
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
        </div>

        {/* profile picture */}
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-1 lg:order-2 flex justify-center"
        >
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
                alt="Profile"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
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
          <h3 className="font-display text-lg md:text-xl font-semibold">
            Experienced in building production-style applications with:
          </h3>
          <ul className="mt-5 space-y-3">
            {[
              "JWT Authentication & Role-Based Access",
              "Microservices Architecture",
              "WebSockets (Real-time apps)",
              "Payment Integration (Razorpay)",
              "Docker-based Deployment",
            ].map((point: string) => (
              <li key={point} className="flex items-center gap-3 text-muted">
                <span className="grid place-items-center size-7 shrink-0 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                  <ArrowRight size={15} />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            "4+ years experience",
            "Production-style projects with real integrations",
            "Strong backend + API design skills",
            "Open to Full Stack / Backend roles",
          ].map((point: string, index: number) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * index }}
              className="glass card-hover p-5 flex flex-col gap-4"
            >
              <span className="grid place-items-center size-10 rounded-xl bg-brand text-white shadow-lg shadow-indigo-500/25">
                <SiTicktick />
              </span>
              <div className="font-medium leading-snug">{point}</div>
            </motion.li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Home;
