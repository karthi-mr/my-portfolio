import { Download } from "lucide-react";
import type { ReactElement } from "react";
import { SiTicktick } from "react-icons/si";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import profileImg from "../assets/profile2.jpg";

const RESUME_PDF_URL: string = "https://drive.google.com/file/d/1UKLLpP9tGlPoilDuIfeo1KwkNucTVHLX/view?usp=drive_link";

const SUB_TITLE: string = "Full Stack Developer | Spring Framework | React | Angular";
const mobileNumber: string = "+91 7708006145"
const mailId: string = "mkarthim1998@gmail.com"

function Home(): ReactElement {
  const navigator: NavigateFunction = useNavigate();

  return (
    <>
      <section className="grow flex flex-col items-center justify-start">
        {/* profile picture */}
        <div className="relative">
          {/* glow behind */}
          <div className="absolute -inset-6 rounded-full bg-cyan-500/25 blur-2xl" />
          {/* circle frame */}
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 overflow-hidden rounded-full border
          border-white/15 bg-white/5 shadow-2xl shadow-black/40">
            <img
              src={profileImg}
              alt="Profile"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
        {/* title */}
        <div
          className="flex flex-col justify-center items-center gap-3 md:gap-5 border-b py-3 md:py-5
          border-slate-600/60 text-center w-[70%]"
        >
          <h1
            className="text-2xl md:text-5xl tracking-wide mb-3 font-bold bg-linear-to-br from-yellow-400
            via-red-400 to-green-400 bg-clip-text text-transparent uppercase"
          >
            Hi, I'm Karthi
          </h1>
          <h2 className="text-lg md:text-2xl text-cyan-300 font-semibold tracking-wide">
            <span>{mailId}</span> {" | "}
            <span>{mobileNumber}</span>
          </h2>
          <h3 className="text-xl md:text-3xl text-blue-400 font-semibold tracking-tight">
            {SUB_TITLE}
          </h3>
        </div>

        {/* short summary */}
        <div className="py-3 md:py-5 w-[90%] md:w-[60%] flex flex-col text-slate-400 gap-1">
          {/* improving points */}
          <h2 className="text-md md:text-xl font-normal tracking-wide italic">Backend-Focused Full Stack Developer</h2>
          <h3 className="text-sm md:text-lg font-normal tracking-wide">
            Building scalable web applications using Java, Spring Boot, React and PostgreSQL
          </h3>
          <h3 className="text-sm md:text-lg font-normal tracking-wide">
            Experienced in developing real-world applications with JWT authentication, microservices architecture, WebSockets, payment integration, and Docker-based deployments.
          </h3>
          <ul className="list-none list-inside">
            <li className="flex gap-2 items-center">
              <SiTicktick />
              <div className="">4+ years experience</div>
            </li>
            <li className="flex gap-2 items-center">
              <SiTicktick />
              <div className="">Production-style projects with real integrations</div>
            </li>
            <li className="flex gap-2 items-center">
              <SiTicktick />
              <div className="">Strong backend + API design skills</div>
            </li>
            <li className="flex gap-2 items-center">
              <SiTicktick />
              <div className="">Open to Full Stack / Backend roles</div>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-6 py-2 md:py-5 border-b
        border-slate-600/60 w-[70%] md:text-xl text-sm flex-col md:flex-row text-center">
          <a
            className="bg-pink-700 hover:bg-pink-800 px-3 md:px-5 py-2 rounded-2xl transition-all cursor-pointer
            font-semibold tracking-tight md:tracking-wider shadow-md shadow-pink-600/50 border
            border-pink-400/70 w-[80%] md:w-auto"
            onClick={() => navigator("/projects")}
          >
            <span>View Projects</span>
          </a>
          <a
            href={RESUME_PDF_URL}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-lime-700 hover:bg-lime-800 px-3 md:px-5 py-2 rounded-2xl transition-all cursor-pointer
            font-semibold tracking-tight md:tracking-wider shadow-md shadow-lime-600/50 border
            border-gray-400/70  w-[80%] md:w-auto md:mb-0 mb-3"
          >
            <div className="flex items-center justify-center gap-1">
              <span><Download size={20} /></span>
              <span>Download Resume</span>
            </div>
          </a>
          <a
            className="bg-yellow-700 hover:bg-yellow-800 px-3 md:px-5 py-2 rounded-2xl transition-all cursor-pointer
            font-semibold tracking-tight md:tracking-wider shadow-md shadow-yellow-600/50 border
            border-yellow-400/70 w-[80%] md:w-auto"
            onClick={() => navigator("/contact")}
          >
            <span>Contact Me</span>
          </a>
        </div>
      </section>
    </>
  );
}

export default Home;
