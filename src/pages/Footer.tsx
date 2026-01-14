import type { ReactElement } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer(): ReactElement {
  return (
    <footer
      className="bg-slate-900 px-4 py-6 text-center border-t border-slate-700 text-gray-300 mt-auto
      shadow-2xl shadow-white/90"
    >
      <div className="flex justify-center gap-4 mb-4">
        <a
          href="https://github.com/karthi-mr"
          target="_blank"
          className="bg-slate-800 p-2 rounded-full hover:bg-blue-500 transition"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/karthi-mr"
          target="_blank"
          className="bg-slate-800 p-2 rounded-full hover:bg-blue-500 transition"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://wa.me/917708006145"
          target="_blank"
          className="bg-slate-800 p-2 rounded-full hover:bg-blue-500 transition text-green-500"
        >
          <FaWhatsapp size={20} />
        </a>
        <a
          href="mailto:mkarthim1998@gmail.com"
          target="_blank"
          className="bg-slate-800 p-2 rounded-full hover:bg-blue-500 transition"
        >
          <MdEmail size={20} />
        </a>
      </div>

      <p>
        &copy; {new Date().getFullYear()} Karthi. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
