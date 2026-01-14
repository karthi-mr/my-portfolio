import type { ReactElement } from "react";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import profileImg from "../assets/profile1.jpg";


const RESUME_PDF_URL: string = "https://drive.google.com/file/d/1UKLLpP9tGlPoilDuIfeo1KwkNucTVHLX/view?usp=drive_link";

const SUB_TITLE: string = "Full Stack Developer | Spring Framework | React | Angular";

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
          <h1 className="text-3xl md:text-5xl font-bold tracking-wider">
            Hi, I'm Karthi
          </h1>
          <h3 className="text-xl md:text-3xl text-blue-400 font-semibold tracking-tight">
            {SUB_TITLE}
          </h3>
        </div>

        {/* short summary */}
        <div className="py-3 md:py-5 w-[90%] md:w-[60%] flex justify-center items-center text-center">
          <p className="font-medium text-sm md:text-xl tracking-tight md:tracking-wider text-slate-500">
            Passionate about building web applications that make an impact. Experienced in developing with Java,
            Spring Framework, React and Angular. Experienced in developing Java, Spring Framework, React and
            Angular projects.
          </p>
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
        </div>
      </section>
    </>
  );
}

export default Home;
